using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("T_AlarmType")]
    public class T_AlarmType
    {
        //public int Id { get; set; }
        public required string AlarmType_Code { get; set; }// 确保长度与 T_RealAlarm 中一致
        public required string AlarmName { get; set; }
        public required ICollection<T_RealAlarm> RealAlarms { get; set; }  // 导航属性
    }
}