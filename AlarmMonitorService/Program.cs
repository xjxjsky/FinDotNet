using AlarmMonitorService.Services;
using FinDotNet.Shared.Interfaces;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register RabbitMqConsumerService to receive the alarm
builder.Services.AddSingleton<IHostedService, AlarmMonitorRabbitMqConsumerService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var rabbitMqConnectionString = config["RabbitMQ:ConnectionString"];

    // 验证读取的连接字符串
    Console.WriteLine($"RabbitMQ Connection String: {rabbitMqConnectionString}");

    // 创建 RabbitMqConsumerService 实例
    return new AlarmMonitorRabbitMqConsumerService(
        rabbitMqConnectionString, 
        sp.GetRequiredService<ILogger<AlarmMonitorRabbitMqConsumerService>>());
});

// 注册 RabbitMqConsumerService 作为托管服务
builder.Services.AddHostedService<AlarmMonitorRabbitMqConsumerService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//RabbitMqConsumerService 已被上面builder.Services.AddHostedService<RabbitMqConsumerService>();注册位常驻托管服务，所以这个地方就不需要了，注释掉
//var consumerService = app.Services.GetRequiredService<RabbitMqConsumerService>(); //RabbitMqConsumerService 实例被创建并在某个地方被使用, 以在 app.Run() 之前添加一个简单的调用，确保服务是活动的

app.Run();


/*
var consumerService = app.Services.GetRequiredService<RabbitMqConsumerService>();
The line:
```csharp
var consumerService = app.Services.GetRequiredService<RabbitMqConsumerService>();
```
is used to *force the instantiation* of `RabbitMqConsumerService` before `app.Run()`. This line explicitly retrieves the `RabbitMqConsumerService` instance from the DI container, ensuring it is created and active in the application.
### Why It's Used in `monitor` but Not in `simulator`
In the `monitor` service, `RabbitMqConsumerService` is likely a background task or a singleton service that needs to start listening for RabbitMQ messages as soon as the application runs. By retrieving it early, you ensure it's "alive" and actively processing any incoming messages, even before the web application starts responding to HTTP requests.
In the `simulator` service, if no similar background tasks or consumers need to be active immediately, there’s no need to force an early instantiation, so it’s not required. The `RabbitMqService` singleton may be registered but does not start any processing independently. 
### Alternative for Background Services
If `RabbitMqConsumerService` is a long-running or recurring task, it’s typically registered as a hosted service:
```csharp
builder.Services.AddHostedService<RabbitMqConsumerService>();
```
This approach allows ASP.NET Core to automatically start and manage the lifecycle of background services, including handling retries and shutdown gracefully. This way, `RabbitMqConsumerService` starts as a managed background service without the need for an explicit instantiation call before `app.Run()`.

*/