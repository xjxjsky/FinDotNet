using System;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using FinDotNet.Shared.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace FinDotNet.Shared.Services
{
    public abstract class BaseRabbitMqConsumerService<T> : IHostedService, IDisposable where T : class
    {
        private readonly IConnection _connection; // RabbitMQ 连接
        private readonly IModel _channel; // RabbitMQ 通道
        private readonly ILogger<BaseRabbitMqConsumerService<T>> _logger;

        private readonly string _exchangeName; // 交换机名称
        private readonly string _queueName; // 监控服务队列
        private readonly string _routingKey; // 路由键

        private bool _disposed; // 资源是否已释放

        protected BaseRabbitMqConsumerService(string rabbitMqConnectionString, string exchangeName, string queueName, string routingKey, ILogger<BaseRabbitMqConsumerService<T>> logger)
        {
            // 构造器中各项子类传入参数初始化
            _exchangeName = exchangeName;
            _queueName = queueName;
            _routingKey = routingKey;
            _logger = logger;

            var factory = new ConnectionFactory() { Uri = new Uri(rabbitMqConnectionString) };

            try
            {
                // 创建 RabbitMQ 连接和通道
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();

                // 声明交换机，确保交换机存在
                _channel.ExchangeDeclare(exchange: _exchangeName, type: ExchangeType.Topic); // 修改为使用 Topic 类型的交换机

                // 声明队列，确保队列存在
                _channel.QueueDeclare(queue: _queueName,
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null);

                // 将队列绑定到交换机
                _channel.QueueBind(queue: _queueName, exchange: _exchangeName, routingKey: _routingKey); // 绑定队列到交换机

                // 启动消费者以接收消息
                StartConsumer();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error connecting to RabbitMQ: {ex.Message}");
                throw;
            }

            // _connection = factory.CreateConnection();
            // _channel = _connection.CreateModel();

            // _channel.ExchangeDeclare(exchange: _exchangeName, type: ExchangeType.Topic);
            // _channel.QueueDeclare(queue: _queueName, durable: false, exclusive: false, autoDelete: false);
            // _channel.QueueBind(queue: _queueName, exchange: _exchangeName, routingKey: _routingKey);

            StartConsumer();
        }

        // 实现接口中的 StartConsumer 方法，启动 RabbitMQ 消费者
        private void StartConsumer()
        {
            _logger.LogInformation("RabbitMQ StartConsumer: I am here!");

            // 创建一个新的 RabbitMQ 消费者实例
            var consumer = new EventingBasicConsumer(_channel);

            // 订阅接收消息的事件
            consumer.Received += (model, ea) =>
            {
                // 获取消息体的字节数组
                var body = ea.Body.ToArray();

                // 将字节数组转换为字符串
                var jsonMessage = Encoding.UTF8.GetString(body);

                try
                {
                    // 反序列化 JSON 消息为 AlarmMessage 对象
                    var alarmMessage = JsonSerializer.Deserialize<AlarmMessage>(jsonMessage);

                    // 记录接收到的告警信息及其时间戳
                    _logger.LogInformation($"Received alarm: {alarmMessage.Message} at {alarmMessage.Timestamp}");

                    // 在这里添加处理告警消息的逻辑 Process the message here
                    // 例如：将消息存储到数据库或触发其他操作
                    //ProcessMessage(alarmMessage); 这里有个抽象方法ProcessMessage，让子类根据各自业务需要去重写实现

                    // Acknowledge the message
                    _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                    _logger.LogInformation("RabbitMQ StartConsumer: This message has been acknowledged by _channel.BasicAck()!");
                }
                catch (Exception ex)
                {
                    // 如果处理消息时出现错误，记录错误信息
                    _logger.LogError($"Error processing message: {ex.Message}, Message: {jsonMessage}");

                    // Optionally handle NACK here if you want to re-queue the message
                    // 选择重试或者将消息发送到死信队列
                    // 在消费者中，如果处理消息时发生错误，可以使用 BasicNack 来拒绝消息并选择重试机制。例如，可以将消息重新排队到队列中，确保消息不会丢失：
                    _channel.BasicNack(deliveryTag: ea.DeliveryTag, multiple: false, requeue: true);
                }
            };

            // 开始消费消息，从指定队列中接收消息
            // autoAck 设置为 true，表示消息一旦被接收就会被 RabbitMQ 标记为已处理(建议设为 false，理由如下面英文注释)
            // You are using autoAck: true in BasicConsume(), which means messages will be acknowledged immediately upon receipt. 
            // If an exception occurs in processing, the message will be lost. Consider using autoAck: false and manually acknowledging messages after successful processing.
            _channel.BasicConsume(queue: _queueName, autoAck: false, consumer: consumer);

        }
        protected abstract void ProcessMessage(T message);

        /*
        private void StartConsumer()
        {
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += OnMessageReceived;
            _channel.BasicConsume(queue: _queueName, autoAck: false, consumer: consumer);
        }

        private void OnMessageReceived(object model, BasicDeliverEventArgs ea)
        {
            var body = ea.Body.ToArray();
            var jsonMessage = Encoding.UTF8.GetString(body);

            try
            {
                var message = JsonSerializer.Deserialize<T>(jsonMessage);
                ProcessMessage(message);
                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                _logger.LogInformation("Message acknowledged.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error processing message: {ex.Message}");
                _channel.BasicNack(deliveryTag: ea.DeliveryTag, multiple: false, requeue: true);
            }
        }
        */

        public void PublishMessage(AlarmMessage alarmMessage)
        {
            if (_disposed) throw new ObjectDisposedException(nameof(BaseRabbitMqConsumerService<AlarmMessage>));

            // var jsonMessage = JsonSerializer.Serialize(alarmMessage);
            // var body = Encoding.UTF8.GetBytes(jsonMessage);
            var body = FinDotNet.Shared.Utilities.JSTools.SerializeMessage(alarmMessage);

            try
            {
                var properties = _channel.CreateBasicProperties();
                properties.Persistent = true; // 确保消息持久化 这将确保 RabbitMQ 将消息持久化到磁盘，避免在 RabbitMQ 容器崩溃时丢失消息。

                // 使用交换机发布消息，指定交换机和路由键
                _channel.BasicPublish(exchange: _exchangeName, // 修改为指定交换机
                    routingKey: _routingKey, // 使用路由键
                    basicProperties: properties,
                    body: body);

                // 等待消息确认
                if (_channel.WaitForConfirms())
                {
                    _logger.LogInformation("Message successfully published to RabbitMQ.");
                }
                else
                {
                    _logger.LogError("Message was not confirmed by RabbitMQ.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error publishing message: {ex.Message}");
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                // 关闭通道和连接
                _channel.Close();
                _connection.Close();
            }
            _disposed = true; // 标记为已释放
        }

        // 在应用启动时自动启动消费者
        /*
        public Task StartAsync(CancellationToken cancellationToken)
        {
            // 在应用启动时自动启动消费者
            StartConsumer();
            _logger.LogInformation("RabbitMqConsumerService started.");

            return Task.CompletedTask;
        }
        */
        public Task StartAsync(CancellationToken cancellationToken) => Task.CompletedTask;
        
        // 在应用停止时执行必要的清理操作
        /*
        public Task StopAsync(CancellationToken cancellationToken)
        {
            // 在应用停止时执行必要的清理操作
            Dispose();
            _logger.LogInformation("RabbitMqConsumerService stopped.");

            return Task.CompletedTask;
        }
        */
        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }

    /*  已在子类中实现，注释掉
    public class AlarmPersistenceRabbitMqConsumerService : BaseRabbitMqConsumerService<AlarmMessage>
    {
        public AlarmPersistenceRabbitMqConsumerService(string rabbitMqConnectionString, ILogger<AlarmPersistenceRabbitMqConsumerService> logger)
            : base(rabbitMqConnectionString, "alarm_exchange", "alarm.common", "alarm.*", logger) { }

        protected override void ProcessMessage(AlarmMessage alarmMessage)
        {
            // Handle alarm persistence logic here
        }
    }

    public class AlarmMonitorRabbitMqConsumerService : BaseRabbitMqConsumerService<AlarmMessage>
    {
        public AlarmMonitorRabbitMqConsumerService(string rabbitMqConnectionString, ILogger<AlarmMonitorRabbitMqConsumerService> logger)
            : base(rabbitMqConnectionString, "alarm_exchange", "alarm.common", "alarm.*", logger) { }

        protected override void ProcessMessage(AlarmMessage alarmMessage)
        {
            // Handle alarm monitoring logic here
        }
    }
    */
}
