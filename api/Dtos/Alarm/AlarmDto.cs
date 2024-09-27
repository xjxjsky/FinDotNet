using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Alarm
{
    public class AlarmDto
    {
        public int Id { get; set; }                          // 告警 ID
        public DateTime HappenTime { get; set; }             // 告警发生时间
        public string BaseStationName { get; set; }          // 基站名称
        public string AlarmTypeName { get; set; }            // 告警类型名称
        public string CompanyName { get; set; }              // 公司名称
        public string OpertionerName { get; set; }           // 操作员名称
        public string PhoneNumber { get; set; }              // 联系电话
        public bool IsFixed { get; set; }                    // 告警是否已修复

        public string AlarmStatusDescription { get; set; }   // 告警状态描述（例如"未修复"或"已修复"）

        public TimeSpan AlarmDuration { get; set; }          // 告警持续时长（业务计算，例如 HappenTime 到现在的时间差）

        // 可以根据需要添加更多业务逻辑字段
    }
}