using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.EntityConfig
{
    public class T_CellConfig : IEntityTypeConfiguration<T_Cell>
    {
        public void Configure(EntityTypeBuilder<T_Cell> builder)
        {
            builder.HasKey(ce => new { ce.Cell_Id }); // 使用 Cell_Id 作为主键,还有两种写法：builder.HasKey(ce => ce.Cell_Id); builder.HasKey("Cell_Id");

            /* builder.HasOne<T_City>(): 这里指定了 T_Cell 实体与 T_City 实体之间的关系，但没有指定 T_City 实体的导航属性。这会导致 EF Core 不知道 T_City 实体中如何表示它与 T_Cell 的关系。
            WithMany(): 这里没有指定 T_City 实体中表示 T_Cell 实体集合的导航属性。没有这个信息，EF Core 无法正确配置关系。
            HasForeignKey(ce => ce.City_Code): 这指定了 T_Cell 实体中的 City_Code 属性作为外键。但是，如果没有指定反向导航属性，EF Core 可能无法正确地识别和配置这个外键。
            影子属性是在模型中存在但不在实体类中的属性。因为缺少反向导航属性，EF Core 可能会创建影子属性来处理关系中的外键。

            builder.HasOne<T_City>() // 假设你有一个 City 实体类
                   .WithMany() // T_City 对 T_Cell 的关系
                   .HasForeignKey(ce => ce.City_Code); //设置City_Code外键
            */

            builder.HasOne(ce => ce.City) // T_Cell 对 T_City 的关系
                   .WithMany( ct => ct.Cells) // T_City 对 T_Cell 的集合
                   .HasForeignKey(ce => ce.City_Code); // 外键属性

            // 这里可以添加其他配置，例如属性的长度、必填等
            // 设置 Cell_Id, City_Code长度与关联表中一致
            builder.Property(ce => ce.Cell_Id).HasMaxLength(50).IsRequired();
            builder.Property(ct => ct.City_Code).HasMaxLength(50).IsRequired();
        }
    }
}