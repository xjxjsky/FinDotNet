using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.EntityConfig;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContexOptions) : base(dbContexOptions)
        {

        }
        // Identity-related DbSets (already included in IdentityDbContext)
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }

        // Business-related DbSets (merged from BusinessDbContext that had been deleted!)
        public DbSet<T_RealAlarm> RealAlarms { get; set; }
        public DbSet<T_AlarmType> AlarmType { get; set; }
        public DbSet<T_BaseStation> BaseStation { get; set; }
        public DbSet<T_Cell> Cell { get; set; }
        public DbSet<T_City> City { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //with Fluent API to Apply these configs
            builder.ApplyConfiguration(new T_RealAlarmConfig());
            builder.ApplyConfiguration(new T_AlarmTypeConfig());
            builder.ApplyConfiguration(new T_BaseStationConfig());
            builder.ApplyConfiguration(new T_CellConfig());
            builder.ApplyConfiguration(new T_CityConfig());

            // Fluent API 配置
            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.AppUserId, p.StockId }));

            builder.Entity<Portfolio>()
                .HasOne(u => u.AppUser)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.AppUserId);

            builder.Entity<Portfolio>()
                .HasOne(u => u.Stock)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.StockId);


            // 初始化角色数据
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }

    }
}