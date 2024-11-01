using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinDotNet.Shared.Models;

namespace FinDotNet.Shared.CommunicationProtocol
{
    internal class GraphQLAlarmService : IAlarmService
    {
        // Implement GraphQL request

        public Task SendAlarmAsync(AlarmMessage message)
        {
            // 实现 SendAlarmAsync 方法
            // ...
            return Task.CompletedTask;
        }

        public Task<AlarmMessage> ReceiveAlarmAsync()
        {
            // 实现 ReceiveAlarmAsync 方法
            // ...
            return Task.FromResult(new AlarmMessage());
        }

    }
    
}
