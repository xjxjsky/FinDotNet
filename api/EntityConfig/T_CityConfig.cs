using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.EntityConfig
{
    public class T_CityConfig : IEntityTypeConfiguration<T_City>
    {
        public void Configure(EntityTypeBuilder<T_City> builder)
        {
            builder.HasKey(ct => ct.City_Code ); // 使用 Cell_Id 作为主键

            // 这里可以添加其他配置，例如属性的长度、必填等
            // 设置 City_Code 的长度与 T_Cell 中一致
            builder.Property(ct => ct.City_Code).HasMaxLength(50).IsRequired();
        }
    }
}