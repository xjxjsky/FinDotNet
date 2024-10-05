using System;
using System.IO; //确保 System.IO 被引用，以防需要处理路径。
using Microsoft.Extensions.Configuration; // 添加这个命名空间
using Serilog;
using SeLog = Serilog.ILogger;

namespace api.Helpers
{
    //我们将创建一个线程安全的单例 LogManager 类，它确保 Serilog 只被配置一次，并且可以在整个应用中方便地访问
    public sealed class LogManager
    {
        // 私有的静态实例，使用 Lazy<T> 实现线程安全的单例
        private static readonly Lazy<LogManager> _instance = new Lazy<LogManager>(() => new LogManager());

        // 私有构造函数，防止外部实例化
        private LogManager() { }

        // 公共的静态属性，提供全局访问点
        public static LogManager Instance => _instance.Value;

        private bool _isInitialized = false;

        // 初始化方法，配置 Serilog
        public void Initialize(IConfiguration configuration)
        {
            if (_isInitialized)
                return;

            // 读取配置文件中的日志路径, 首先尝试从环境变量读取，然后如果环境变量没有值，则使用默认路径。
            var logPath = configuration["Logging:LogPath"] ?? Environment.GetEnvironmentVariable("DEFAULT_LOG_PATH") ?? "logs/myapp.txt";

            if (string.IsNullOrEmpty(logPath))
            {
                throw new ArgumentNullException(nameof(logPath), "Log path cannot be null or empty.");
            }

            // 配置 Serilog
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.Console()
                .WriteTo.File(logPath, rollingInterval: RollingInterval.Day)
                .CreateLogger();

            _isInitialized = true;
        }

        // 提供一个公共的 Serilog 日志记录器实例
        public SeLog Logger => Log.Logger;
    }
}

/*
单例模式实现：

    使用 Lazy<T> 确保 LogManager 实例的线程安全和延迟初始化。
    私有构造函数防止外部实例化。

初始化方法：

    Initialize 方法接受一个 IConfiguration 对象，用于读取配置文件中的日志路径。
    通过检查 _isInitialized 确保 Serilog 只被配置一次，避免重复配置。

日志记录器访问：

    提供一个 Logger 属性，返回 Serilog 的日志记录器实例，供其他类使用。
*/