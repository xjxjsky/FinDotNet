using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinDotNet.Shared.Models
{
    public class AlarmMessage
    {

        public int Id { get; set; }
        public string AlarmName { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Severity { get; set; } = "Critical"; // 默认值为 Critical
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public string PhoneNumber { get; set; } = string.Empty;
        public string OperatorName { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string BaseStationId { get; set; } = string.Empty;
        public string AlarmType { get; set; } = string.Empty;
        public string Remark001 { get; set; } = string.Empty;
        public string Remark002 { get; set; } = string.Empty;
        public string Remark003 { get; set; } = string.Empty;

        // 可以根据需要添加更多属性 如果有需要，可以增加额外的处理逻辑，比如格式化字符串的方法
    }
}
