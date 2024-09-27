using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.EntityConfig
{
    public class T_AlarmTypeConfig : IEntityTypeConfiguration<T_AlarmType>
    {
        public void Configure(EntityTypeBuilder<T_AlarmType> builder)
        {
            //builder.HasKey(at => new { at.Id, at.AlarmType_Code }); delete Id复合主键，只用Alarm_Code做主键
            builder.HasKey(at => new { at.AlarmType_Code }); // 使用 AlarmType_Code 作为主键

            // 这里可以添加其他配置，例如属性的长度、必填等
            // 设置 AlarmType_Code 的长度与 T_RealAlarm 中一致
            builder.Property(at => at.AlarmType_Code).HasMaxLength(50).IsRequired();
            //builder.ToTable("T_AlarmType");
        }

    }
}