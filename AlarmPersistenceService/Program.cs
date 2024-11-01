using AlarmPersistenceService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register RabbitMqConsumerService to receive the alarm
builder.Services.AddSingleton<IHostedService, AlarmPersistenceRabbitMqConsumerService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var rabbitMqConnectionString = config["RabbitMQ:ConnectionString"];

    // 验证读取的连接字符串
    Console.WriteLine($"RabbitMQ Connection String: {rabbitMqConnectionString}");

    // 创建 RabbitMqConsumerService 实例
    return new AlarmPersistenceRabbitMqConsumerService(
        rabbitMqConnectionString, 
        sp.GetRequiredService<ILogger<AlarmPersistenceRabbitMqConsumerService>>());
});

// 注册 RabbitMqConsumerService 作为托管服务
builder.Services.AddHostedService<AlarmPersistenceRabbitMqConsumerService>();

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

app.Run();
