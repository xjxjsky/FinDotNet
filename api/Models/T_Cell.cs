using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("T_Cell")]
    public class T_Cell
    {
        //public int Id { get; set; }
        [Key]
        public required string Cell_Id { get; set; } //主键
        public required string CellName { get; set; }
        public required string City_Code { get; set; }

        public required T_City City { get; set; }  // 导航属性, 指向 T_City 实体

        // 反向导航属性
        public required ICollection<T_BaseStation> BaseStations { get; set; }  // 可选，依据实际需求
    }
}