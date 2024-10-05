using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using api.Helpers;
using api.Interfaces;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/alarm")]
    [ApiController]
    public class AlarmController : ControllerBase // 由Controller改为继承 ControllerBase, 适合 API 控制器
    {
        //private readonly ILogger<AlarmController> _logger;    //弃用.net 自带日志管理 启用 Serilog日志管理系统 LogManager Static Class
        private readonly IAlarmRepository _alarmRepo;

        //public AlarmController(ILogger<AlarmController> logger, IAlarmRepository alarmRepo)
        public AlarmController(IAlarmRepository alarmRepo)
        {
            //_logger = logger;
            _alarmRepo = alarmRepo;
        }

        // 指定为 GET 方法
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] AlarmQueryObject query)
        {
            LogManager.Logger.Information("Jay's here: AlarmController IActionResult GetAll");
            if (!ModelState.IsValid)  //这两行代码确保做Validation check
                return BadRequest(ModelState);

            var alarms = await _alarmRepo.GetAllAsync(query); 
            var alarmDtos = alarms.Select(a => a.ToAlarmDto()).ToList(); //取回的Alarm => AlarmDto
            return Ok(alarmDtos);
 
        }



        // 同样为 Error 方法指定 GET 方法
        [HttpGet("error")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return Problem("An error occurred.");
        }
    }
}
