using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinDotNet.Shared.Models;
using RabbitMQ.Client;

namespace FinDotNet.Shared.Interfaces
{
    // 定义通用的 RabbitMQ 消费者接口
    // 接口 IRabbitMqConsumerService：定义了通用的 StartConsumer()、PublishMessage(AlarmMessage alarmMessage) 和 Dispose() 方法。
    public interface IRabbitMqConsumerService : IDisposable, IMessage
    {
        /// <summary>
        /// 异步启动消费者。
        /// </summary>
        /// <returns>表示异步操作的任务。</returns>
        //Task StartConsumerAsync();

        /// <summary>
        /// 异步发布告警消息到 RabbitMQ。
        /// </summary>
        /// <param name="alarmMessage">要发布的告警消息。</param>
        /// <returns>表示异步操作的任务。</returns>
        //Task PublishMessageAsync(AlarmMessage alarmMessage);

        public void PublishMessage(AlarmMessage alarmMessage);
    }
}