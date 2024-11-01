using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AlarmSimulatorService.Services;
using FinDotNet.Shared.Models; //FinDotNet.Shared
using Microsoft.Extensions.Logging; // 添加日志记录
using FinDotNet.Shared.Utilities;

namespace AlarmSimulatorService.Controllers
{
    //[EnableCors("AllowFrontend")]
    [ApiController]
    [Route("[controller]")]
    public class AlarmSimulatorController : ControllerBase
    {
        private readonly RabbitMqService _rabbitMqService;
        private readonly ILogger<AlarmSimulatorController> _logger; // 注入 ILogger 以便记录日志

        public AlarmSimulatorController(RabbitMqService rabbitMqService, ILogger<AlarmSimulatorController> logger)
        {
            _rabbitMqService = rabbitMqService;
            _logger = logger;
        }

        // 将控制器中的 PublishMessage 方法更改为异步  
        [HttpPost("send-alarm")]
        public async Task<IActionResult> SendAlarm([FromBody] AlarmMessage alarmMessage)
        {
            if (alarmMessage == null)
            {
                _logger.LogError("Received null alarm message from PostMan!");
                return BadRequest("Alarm message cannot be null from PostMan!");
            }

            _logger.LogInformation($"Received alarm message from PostMan: {JSTools.PrintAll(alarmMessage)}"); // 打印接收到的消息内容

            try
            {
                // 推送消息 to RabbitMQ
                _rabbitMqService.PublishMessage(alarmMessage);
                _logger.LogInformation("Alarm message from PostMan successfully sent to RabbitMQ");
                return Ok("Alarm message sent to RabbitMQ from PostMan!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while sending message from PostMan to RabbitMQ: {ex.Message}");
                return StatusCode(500, "Error while sending message from PostMan to RabbitMQ");
            }
        }
    }
}
