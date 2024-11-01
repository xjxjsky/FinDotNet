using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;
using FinDotNet.Shared.Models;
using Microsoft.Extensions.Logging;
using FinDotNet.Shared.Interfaces;
using FinDotNet.Shared.Services;


namespace AlarmPersistenceService.Services
{
    public class AlarmPersistenceRabbitMqConsumerService: BaseRabbitMqConsumerService<AlarmMessage>
    {
        public AlarmPersistenceRabbitMqConsumerService(string rabbitMqConnectionString, ILogger<AlarmPersistenceRabbitMqConsumerService> logger)
            : base(rabbitMqConnectionString, "alarm_exchange", "alarmPersistence", "alarm.persistence", logger) { }

        protected override void ProcessMessage(AlarmMessage alarmMessage)
        {
            // Handle alarm monitoring logic here
        }
    }
}

/*
在这个情况下，应该使用 ILogger<AlarmPersistenceRabbitMqConsumerService>。原因如下：

特定性：ILogger<AlarmPersistenceRabbitMqConsumerService> 会为 AlarmPersistenceRabbitMqConsumerService 类提供一个特定的日志上下文，便于在日志记录中区分来自不同类的日志信息，这样可以帮助您更清晰地了解日志是由哪个具体服务产生的。

继承层次：虽然 AlarmPersistenceRabbitMqConsumerService 继承了 BaseRabbitMqConsumerService<AlarmMessage>，但是在依赖注入系统中更常见的做法是为每个具体的类提供专属的 ILogger 实例，这样可以更好地遵循单一责任原则，也有助于在应用程序中准确跟踪日志源。
*/

