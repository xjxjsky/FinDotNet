using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("T_BaseStation")]
    public class T_BaseStation
    {
        //public int Id { get; set; }
        [Key]
        public required string BaseStation_Id { get; set; }
        public required string BaseStationName { get; set; }
        public required string Cell_Id { get; set; } //外键属性

        public required T_Cell Cell { get; set; }  // 导航属性
        public required ICollection<T_RealAlarm> RealAlarms { get; set; }  // 导航属性
    }
}