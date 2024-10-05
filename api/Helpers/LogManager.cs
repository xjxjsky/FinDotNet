using System;
using System.IO;
using Microsoft.Extensions.Configuration; // 添加这个命名空间
using Serilog;

namespace api.Helpers
{
    public static class LogManager
    {
        private static IConfiguration? _configuration;

        // 静态方法用于初始化日志
        public static void Initialize(IConfiguration configuration)
        {
            _configuration = configuration;

            // 读取配置文件中的日志路径
            var logPath = _configuration["Logging:LogPath"] ?? Environment.GetEnvironmentVariable("DEFAULT_LOG_PATH") ?? "logs/myapp.txt";

            if (string.IsNullOrEmpty(logPath))
            {
                throw new ArgumentNullException(nameof(logPath), "Log path cannot be null or empty.");
            }

            // Configure Serilog  //链式调用？
            Serilog.Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.Console()
                .WriteTo.File(logPath, rollingInterval: RollingInterval.Day)
                .CreateLogger();
        }

        // 提供一个公共的 Log 属性
        public static Serilog.ILogger Logger => Serilog.Log.Logger;
    }
}
