using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AlarmPersistenceService.Services;
using FinDotNet.Shared.Models;
using FinDotNet.Shared.Services;

namespace AlarmPersistenceService.Controllers
{
    [Route("jay/[controller]")]
    public class AlarmPersistenceController: ControllerBase
    {
        private readonly BaseRabbitMqConsumerService<AlarmMessage> _rabbitMqService;
        private readonly ILogger<AlarmPersistenceController> _logger;

        public AlarmPersistenceController(BaseRabbitMqConsumerService<AlarmMessage> rabbitMqService, ILogger<AlarmPersistenceController> logger)
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