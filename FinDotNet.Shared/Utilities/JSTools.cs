using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using FinDotNet.Shared.Models;


namespace FinDotNet.Shared.Utilities
{
    public static class JSTools
    {
        public static byte[] SerializeMessage(AlarmMessage alarmMessage)
        {
            var jsonMessage = JsonSerializer.Serialize(alarmMessage);
            return Encoding.UTF8.GetBytes(jsonMessage);
        }

        public static string PrintAll(AlarmMessage alarmMessage)
        {
            StringBuilder sb = new StringBuilder();

            foreach (var property in alarmMessage.GetType().GetProperties())
            {
                var name = property.Name;
                var value = property.GetValue(alarmMessage, null) ?? "null";
                sb.AppendLine($"{name}: {value}");
                sb.AppendLine(); // 添加一个空行

            }

            return sb.ToString();
        }
    }
}