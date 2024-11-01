using FinDotNet.Shared.Models;
using AlarmSimulatorService.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FinDotNet.Shared.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "https://witty-moss-0dca53900.5.azurestaticapps.net", 
            "http://localhost:5177",
            "http://localhost:3000",
            "http://localhost:5000",
            "http://localhost:5001",
            "https://localhost:5001",
            "http://localhost:5002",
            "http://localhost:5003"
        )
        .AllowAnyMethod() 
        .AllowAnyHeader() 
        .AllowCredentials(); // 必须添加此配置
    });
});


// 添加 RabbitMQ 连接字符串
//var rabbitMqConnectionString = builder.Configuration["RabbitMQ:ConnectionString"]; // 使用正确的访问方式
//builder.Services.AddSingleton(new RabbitMqService(rabbitMqConnectionString));
builder.Services.AddSingleton<RabbitMqService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var rabbitMqConnectionString = config.GetConnectionString("RabbitMQ");
    if (string.IsNullOrEmpty(rabbitMqConnectionString))
    {
        throw new ArgumentNullException(nameof(rabbitMqConnectionString), "RabbitMQ connection string cannot be null or empty.");
    }
    return new RabbitMqService(rabbitMqConnectionString);
});

// 注册 RabbitMQ 消费者服务为托管服务
//builder.Services.AddHostedService<RabbitMqConsumerService>();  测试消费者用，平时请注释掉

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowFrontend"); // 应用 CORS 策略

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



// 其他中间件
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
