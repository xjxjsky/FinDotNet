using FinDotNet.Shared.Interfaces;
using FinDotNet.Shared.Models;
using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

namespace AlarmSimulatorService.Services
{
    //对 RabbitMqService 进行修改，以实现连接管理、异常处理和异步消息发布。
    public class RabbitMqService : IDisposable, IRabbitMqService
    {
        //将 _connection 和 _channel 字段的 readonly 修饰符移除，以允许在 EnsureConnection 中重新赋值(这将允许在需要重连的情况下重新创建连接和通道)
        private IConnection _connection;
        private IModel _channel;
        private readonly string[] _queueNames = { "alarmMonitor", "alarmPersistence" }; // 多个队列
        private readonly string[] _routingKeys = { "alarm.monitor", "alarm.persistence" }; // 路由键
        private readonly string _exchangeName = "alarm_exchange"; // 主题交换名称
        private readonly string _exchangeType;
        private readonly string _rabbitMqConnectionString; // Add readonly connection string field
        private bool _disposed;

        public RabbitMqService(string rabbitMqConnectionString, string exchangeType = ExchangeType.Topic) // 修改默认值ExchangeType.Fanout => ExchangeType.Topic
        {
            _rabbitMqConnectionString = rabbitMqConnectionString; // Initialize the connection string
            _exchangeType = exchangeType;

            // 创建连接
            EnsureConnection();
        }

        /*The PublishMessageAsync method uses Task.Run, which is generally not recommended for I/O-bound operations like network calls. 
         *Instead, consider using asynchronous methods provided by RabbitMQ if available, or remove Task.Run and make the method synchronous if it's not truly asynchronous
        避免不必要的线程开销：
        使用 Task.Run 会在一个新的线程池线程中运行代码，这对 I/O 密集型操作（例如网络调用）来说是低效的。RabbitMQ 的操作本身就是异步的，使用 Task.Run 实际上增加了不必要的线程开销。
        提高代码可读性：
        当方法直接处理发布消息的逻辑而不使用 Task.Run 时，代码更加简洁，易于理解。
        利用异步编程模型：
        由于 RabbitMQ 的方法本身并没有提供异步版本（如 BasicPublishAsync），我们可以保持方法的同步性质，而不强迫其异步执行。这样可以更好地与调用该方法的上下文集成。
        维护一致性：
        如果需要在未来引入 RabbitMQ 的异步支持，可以在代码中保持一致性，避免不同调用方式之间的混淆。
        这样修改后，PublishMessageAsync 方法将更高效、更易读，同时避免了不必要的资源消耗。这是对 I/O 操作更合适的处理方式。
        */
        // public async Task PublishMessageAsync(AlarmMessage alarmMessage)
        // {
        //     if (_disposed) throw new ObjectDisposedException(nameof(RabbitMqService));

        //     var jsonMessage = JsonSerializer.Serialize(alarmMessage);
        //     var body = Encoding.UTF8.GetBytes(jsonMessage);

        //     try
        //     {
        //         await Task.Run(() =>
        //         {
        //             // 根据交换机类型选择发布机制
        //             //RabbitMQ 的默认交换机机制是direct ，而非 fanout 类型direct 交换机是使用明确的 routingKey 将消息发送到指定的队列。
        //             //而在 fanout 交换机中，消息会广播到与交换机绑定的所有队列，而不考虑 routingKey。
        //             //BasicPublish 方法的 exchange 参数传入的是空字符串 ("")，这意味着使用 RabbitMQ 的默认交换机direct，实际是使用了 direct 类型的消息路由,而非fanout

        //             // 根据交换机类型选择发布机制
        //             if (_exchangeType == "fanout")
        //             {
        //                 _channel.BasicPublish(exchange: _exchangeName,
        //                     routingKey: "",  // Fanout 类型不使用 routingKey
        //                     basicProperties: null,
        //                     body: body);
        //             }
        //             else if (_exchangeType == "direct")
        //             {
        //                 // 对于 direct 类型，使用 routingKey 指定队列
        //                 _channel.BasicPublish(exchange: _exchangeName,
        //                     routingKey: _queueName,
        //                     basicProperties: null,
        //                     body: body);
        //             }

        //             Console.WriteLine($"Message published to RabbitMQ ({_exchangeType}): " + jsonMessage);

        //         });
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.WriteLine($"Error publishing message: {ex.Message}, exchangeType: ({_exchangeType})");
        //     }
        // }

        public void PublishMessage(AlarmMessage alarmMessage)
        {
            if (_disposed) throw new ObjectDisposedException(nameof(RabbitMqService));

            // 确保连接有效
            EnsureConnection();

            // var jsonMessage = JsonSerializer.Serialize(alarmMessage);
            // var body = Encoding.UTF8.GetBytes(jsonMessage);
            // 序列化消息体
            var body = FinDotNet.Shared.Utilities.JSTools.SerializeMessage(alarmMessage);
            var properties = _channel.CreateBasicProperties();
            properties.Persistent = true; // 确保消息持久化 这将确保 RabbitMQ 将消息持久化到磁盘，避免在 RabbitMQ 容器崩溃时丢失消息。

            try
            {
                // 根据交换机类型选择发布机制
                if (_exchangeType == "fanout")
                {
                    _channel.BasicPublish(exchange: _exchangeName,
                        routingKey: "",  // Fanout 类型不使用 routingKey
                        basicProperties: properties,
                        body: body);
                }
                else if (_exchangeType == "direct")
                {
                    // 对于 direct 类型，使用 routingKey 指定队列
                    // _channel.BasicPublish(exchange: _exchangeName,
                    //     routingKey: _queueName,
                    //     basicProperties: properties,
                    //     body: body);
                }
                else if (_exchangeType == ExchangeType.Topic)
                {
                    // 使用 Topic 类型，routingKey 根据需求设置
                    // 假设这里需要根据 alarmMessage 的属性动态设置 routingKey

                    foreach (var routingKey in _routingKeys)
                    {
                        //string routingKey = GetRoutingKeyForAlarmMessage(alarmMessage);
                        _channel.BasicPublish(exchange: _exchangeName,
                            routingKey: routingKey,
                            basicProperties: properties,
                            body: body);

                        Console.WriteLine($"Message BasicPublish to RabbitMQ routingKey: ({routingKey}), exchange: {_exchangeName}");
                    }
                }

                //Console.WriteLine($"Message published to RabbitMQ ({_exchangeType}): {body}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error publishing message: {ex.Message}, exchangeType: ({_exchangeType})");
                // 可选：将消息记录到日志系统或重试机制
            }
        }

        //确保在每次调用 PublishMessage 前检查 _connection 和 _channel 的状态，并在未建立连接的情况下重新连接。
        private void EnsureConnection()
        {
            if (_connection == null || !_connection.IsOpen)
            {
                DisposeConnection(); // 释放现有连接

                try
                {
                    var factory = new ConnectionFactory() { Uri = new Uri(_rabbitMqConnectionString) };
                    _connection = factory.CreateConnection();
                    _channel = _connection.CreateModel();

                    // 先声明交换机
                    _channel.ExchangeDeclare(exchange: _exchangeName, type: _exchangeType);

                    foreach (var queueName in _queueNames)
                    {
                        // 声明队列
                        _channel.QueueDeclare(queue: queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

                        // 绑定队列到交换机
                        foreach (var routingKey in _routingKeys)
                        {
                            _channel.QueueBind(queue: queueName, exchange: _exchangeName, routingKey: routingKey);
                            Console.WriteLine($"[JS...] Queue '{queueName}' bound to exchange '{_exchangeName}' with routing key '{routingKey}'");
                        }
                          
                    }

                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error creating connection or channel: {ex.Message}");
                    throw;
                }
            }
        }

        // 根据 AlarmMessage 的属性生成动态的 routingKey
        // private string GetRoutingKeyForAlarmMessage(AlarmMessage alarmMessage)
        // {
        //     // 根据告警类型或其他属性决定 routingKey
        //     // 示例：如果 alarmMessage.Type 为“monitor”，返回对应的 routingKey
        //     // return alarmMessage.Severity switch
        //     // {
        //     //     "monitor" => "alarm.monitor",
        //     //     "persist" => "alarm.persist",
        //     //     "report" => "alarm.report",
        //     //     _ => "alarm.default", // 默认 routingKey
        //     // };
        //     return "alarm.common";  //统一设置成 "alarm.common"， 以后根据业务需求再改
        // }


        //将 DisposeConnection 放在 Dispose 方法中调用，以确保资源在释放时不会被泄漏。
        //在 DisposeConnection 方法中确保 _channel 和 _connection 都完全释放并置为 null，以便在 EnsureConnection 中重新初始化连接和通道。
        private void DisposeConnection()
        {
            _channel?.Close();
            _channel?.Dispose();
            _connection?.Close();
            _connection?.Dispose();
            _channel = null;
            _connection = null;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        //为了避免在 Dispose 之后再次使用资源，可以在 _disposed 标志被设置之前清理通道和连接
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    // _channel?.Close();
                    // _connection?.Close();
                    // _channel?.Dispose();
                    // _connection?.Dispose();
                    DisposeConnection();
                }
                _disposed = true;
            }
        }

    }
}


/*
代码现在看起来更完善了，包含了以下几个重要的改进：

    连接和通道管理：EnsureConnection()方法在发布消息之前检查_connection和_channel的状态，并在需要时重新建立连接和通道。这样可以在RabbitMQ连接中断时自动重连，提高系统的稳定性。

    持久化消息：您已设置properties.Persistent = true，确保消息被持久化。这是一个好的做法，在出现异常时有助于防止消息丢失。

    异常处理：在PublishMessage和EnsureConnection方法中使用try-catch块来处理可能的异常，并记录错误信息。这有助于调试并为将来扩展重试机制打下基础。

    Dispose实现：您在Dispose方法中调用了DisposeConnection()，并将_disposed标志设置为true，确保在资源被释放后不再使用它们。这种方法有效防止了资源泄漏。

    去掉不必要的异步：移除了Task.Run并改为同步方法，这样更高效。由于RabbitMQ并不直接提供异步方法，保留同步方法避免了额外线程的开销。

尽管代码现在是正确的，也可以考虑以下小的优化：

    使用更灵活的消息重试机制：在发布消息失败时可以实现一个简单的重试机制或引入日志记录，以应对临时的网络问题或服务不可用的情况。
    日志记录：您可以考虑引入更全面的日志系统（如Serilog或NLog），便于记录不同的异常情况和消息内容，帮助日后分析和监控系统运行状态。

总体来说，代码已经很好地实现了RabbitMQ的连接管理、消息发布和资源清理，适合生产环境。
*/