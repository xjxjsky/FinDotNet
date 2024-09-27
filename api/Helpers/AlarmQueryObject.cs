using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class AlarmQueryObject
    {
        public string? BaseStationName { get; set; } // 基站名称
        public string? AlarmTypeName { get; set; }   // 告警类型名称
        public DateTime? StartTime { get; set; }     // 告警开始时间
        public DateTime? EndTime { get; set; }       // 告警结束时间
        public string? SortBy { get; set; }          // 排序字段（如 "BaseStation" 或 "AlarmType"）
        public bool IsDescending { get; set; }       // 是否降序
        public int PageNumber { get; set; } = 1;     // 页码
        public int PageSize { get; set; } = 10;      // 每页大小
    }
}