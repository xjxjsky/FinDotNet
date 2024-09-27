using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("T_RealAlarm")]
    public class T_RealAlarm
    {
        public int Id { get; set; }
        public DateTime HappenTime { get; set; }
        public required string PhoneNumber { get; set; }
        public required string OpertionerName { get; set; }
        public required string CompanyName { get; set; }
        public required bool FixOrNot { get; set; }
        public required string BaseStation_Id { get; set; }
        public required string AlarmType_Code { get; set; }

        public required T_BaseStation BaseStation { get; set; }  // 导航属性
        public required T_AlarmType AlarmType { get; set; }      // 导航属性
    }
}