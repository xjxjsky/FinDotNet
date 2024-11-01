using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinDotNet.Shared.Models;

namespace FinDotNet.Shared.Interfaces
{
    // 定义 RabbitMQ 服务接口
    public interface IRabbitMqService : IDisposable, IMessage
    {
        /// <summary>
        /// 异步发布告警消息到 RabbitMQ。
        /// </summary>
        /// <param name="alarmMessage">要发布的告警消息。</param>
        /// <returns>表示异步操作的任务。</returns>
        //Task PublishMessageAsync(AlarmMessage alarmMessage);
        public void PublishMessage(AlarmMessage alarmMessage);
    }
}
