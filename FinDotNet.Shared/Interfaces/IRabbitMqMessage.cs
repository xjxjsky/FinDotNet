using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinDotNet.Shared.Models;

namespace FinDotNet.Shared.Interfaces
{
    public interface IMessage
    {
        public void PublishMessage(AlarmMessage alarmMessage);
    }
}