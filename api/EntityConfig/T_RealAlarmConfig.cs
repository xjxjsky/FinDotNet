using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.EntityConfig
{
    public class T_RealAlarmConfig : IEntityTypeConfiguration<T_RealAlarm>
    {
        public void Configure(EntityTypeBuilder<T_RealAlarm> builder)
        {
            // 使用 BaseStation_Id 作为主键
            builder.HasKey(ra => ra.Id);

            // 配置属性
            builder.Property(ra => ra.OpertionerName).IsRequired().HasMaxLength(50);
            builder.Property(ra => ra.HappenTime).IsRequired();
            builder.Property(ra => ra.PhoneNumber).IsRequired().HasMaxLength(30);
            builder.Property(ra => ra.CompanyName).IsRequired().HasMaxLength(50);
            builder.Property(ra => ra.FixOrNot).IsRequired().HasMaxLength(4);
            builder.Property(ra => ra.BaseStation_Id).IsRequired().HasMaxLength(50);
            builder.Property(ra => ra.AlarmType_Code).IsRequired().HasMaxLength(50); // 确保长度与 T_RealAlarm 中一致 否则DB build fails

            // 配置与 T_AlarmType 的一对多关系
            builder.HasOne(ra => ra.AlarmType)
                   .WithMany(ra => ra.RealAlarms)
                   .HasForeignKey(ra => ra.AlarmType_Code);

            // 配置与 T_BaseStation 的一对多关系
            builder.HasOne(ra => ra.BaseStation)
                   .WithMany(ra => ra.RealAlarms)
                   .HasForeignKey(ra => ra.BaseStation_Id);

            //builder.ToTable("T_RealAlarm");
        }
    }
}