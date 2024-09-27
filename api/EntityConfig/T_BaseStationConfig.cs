using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.EntityConfig
{
    public class T_BaseStationConfig : IEntityTypeConfiguration<T_BaseStation>
    {
        public void Configure(EntityTypeBuilder<T_BaseStation> builder)
        {
            // 使用 BaseStation_Id 作为主键
            builder.HasKey(bs => new { bs.BaseStation_Id });

            // 配置外键（Cell_Id）
            /* 配置 HasForeignKey 时，使用导航属性 bs.Cell 来定义外键，这样可以避免创建影子属性，并清晰地描述表之间的关系。
            builder.HasOne<T_Cell>() // 假设你有一个 Cell 实体类
                   .WithMany()
                   .HasForeignKey(bs => new {bs.Cell_Id});
            */
            builder.HasOne(bs => bs.Cell) //设置导航属性
                   .WithMany( ce => ce.BaseStations) //Cell 对 BaseStations 的集合
                   .HasForeignKey(bs => bs.Cell_Id); //外键属性

            // 这里可以添加其他配置，例如属性的长度、必填等
            builder.Property(bs => bs.BaseStation_Id).IsRequired().HasMaxLength(50); //主键BaseStation_Id长度必须与 Real_Alarm 中的外键BaseStation_Id保持一致
            builder.Property(bs => bs.Cell_Id).HasMaxLength(50).IsRequired();//外键Cell_Id长度必须与Cell中的主键Cell_Id保持一致

            //builder.ToTable("T_BaseStation");
        }


    }

}