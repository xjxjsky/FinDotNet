using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Net.Http.Headers;

namespace api.Models
{
    [Table("T_City")]
    public class T_City
    {
        //public int Id { get; set; }
        [Key]
        public required string City_Code { get; set; }
        public required string CityName { get; set; }
    
        public required ICollection<T_Cell> Cells {get; set;} //导航属性, T_City 对 T_Cell 的集合
    }
}