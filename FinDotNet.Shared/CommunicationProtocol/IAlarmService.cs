
using FinDotNet.Shared.Models;

namespace FinDotNet.Shared.CommunicationProtocol
{
    public interface IAlarmService
    {
        Task SendAlarmAsync(AlarmMessage message);
        Task<AlarmMessage> ReceiveAlarmAsync();
    }
}