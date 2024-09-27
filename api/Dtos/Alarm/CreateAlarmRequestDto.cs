using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Alarm
{
    public class CreateAlarmRequestDto
    {
        [Required]
        public DateTime HappenTime { get; set; }            // 告警发生时间

        [Required]
        [MaxLength(100, ErrorMessage = "Phone number length cannot exceed 100 characters")]
        public string PhoneNumber { get; set; }             // 联系电话

        [Required]
        [MaxLength(100, ErrorMessage = "Operator name length cannot exceed 100 characters")]
        public string OpertionerName { get; set; }          // 操作员名称

        [Required]
        [MaxLength(100, ErrorMessage = "Company name length cannot exceed 100 characters")]
        public string CompanyName { get; set; }             // 公司名称

        [Required]
        public bool FixOrNot { get; set; }                  // 是否已修复

        [Required]
        [MaxLength(50, ErrorMessage = "Base Station ID length cannot exceed 50 characters")]
        public string BaseStation_Id { get; set; }          // 基站 ID，可能通过前端传入的 ID 或名称来查找基站

        [Required]
        [MaxLength(50, ErrorMessage = "Alarm Type code length cannot exceed 50 characters")]
        public string AlarmType_Code { get; set; }          // 告警类型代码，类似的通过 ID 或代码查找告警类型

        // 你也可以添加额外的业务字段，比如创建者信息、设备信息等
    }
}