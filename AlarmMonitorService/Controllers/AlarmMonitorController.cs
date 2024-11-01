using AlarmMonitorService.Services;
using Microsoft.AspNetCore.Mvc;
using FinDotNet.Shared.Models;
using Microsoft.Extensions.Logging; // 添加日志记录
using FinDotNet.Shared.Services;

namespace AlarmMonitorService.Controllers
{
    [ApiController]
    [Route("jay/[controller]")]
    public class AlarmMonitorController : ControllerBase
    {
        private readonly BaseRabbitMqConsumerService<AlarmMessage> _rabbitMqService;
        private readonly ILogger<AlarmMonitorController> _logger; // 注入 ILogger 以便记录日志

        public AlarmMonitorController(BaseRabbitMqConsumerService<AlarmMessage> rabbitMqService, ILogger<AlarmMonitorController> logger)
        {
            _rabbitMqService = rabbitMqService;
            _logger = logger;
        }

        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            _logger.LogInformation("Health check called");
            return Ok("AlarmMonitoringService is running");
        }

        [HttpPost("trigger-alarm")]
        public IActionResult TriggerAlarm([FromBody] AlarmMessage alarmMessage)
        {
            if (alarmMessage == null)
            {
                _logger.LogError("Received null alarm message");
                return BadRequest("Alarm message cannot be null");
            }

            _logger.LogInformation($"Received alarm message: {alarmMessage.Message}"); // 打印接收到的消息内容
            try
            {
                _rabbitMqService.PublishMessage(alarmMessage);
                _logger.LogInformation("Alarm message successfully triggered");
                return Ok("Alarm message triggered");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while sending message to RabbitMQ: {ex.Message}");
                return StatusCode(500, "Error while triggering alarm message");
            }
        }
    }
}
