using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;


namespace api.Repository
{
    public class AlarmRepository: IAlarmRepository
    {
        private readonly ApplicationDBContext _context;

        public AlarmRepository(ApplicationDBContext context)
        {

            _context = context;
        }

        /*Filtering & Sorting & data using Entity Framework*/
        public async Task<List<T_RealAlarm>> GetAllAsync(AlarmQueryObject query)
        {
            // 获取所有告警，并包括关联的基站和告警类型
            /*SELECT *
             FROM RealAlarms AS a
             JOIN BaseStations AS b ON a.BaseStationId = b.BaseStationId
             JOIN AlarmTypes AS c ON a.AlarmTypeId = c.AlarmTypeId
            */
            var alarms = _context.RealAlarms.Select(a=>a)
                                 .Include(a => a.BaseStation)
                                 .Include(a => a.AlarmType)
                                 .AsQueryable();

            // // 筛选基站名称
            // if (!string.IsNullOrWhiteSpace(query.BaseStationName))
            // {
            //     alarms = alarms.Where(a => a.BaseStation.Name.Contains(query.BaseStationName));
            // }

            // // 筛选告警类型名称
            // if (!string.IsNullOrWhiteSpace(query.AlarmTypeName))
            // {
            //     alarms = alarms.Where(a => a.AlarmType.TypeName.Contains(query.AlarmTypeName));
            // }

            // // 筛选告警时间范围
            // if (query.StartTime.HasValue)
            // {
            //     alarms = alarms.Where(a => a.AlarmTime >= query.StartTime.Value);
            // }

            // if (query.EndTime.HasValue)
            // {
            //     alarms = alarms.Where(a => a.AlarmTime <= query.EndTime.Value);
            // }

            // 排序
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                switch (query.SortBy.ToLower())
                {
                    case "basestation":
                        alarms = query.IsDescending ? alarms.OrderByDescending(a => a.BaseStation.BaseStationName)
                                                    : alarms.OrderBy(a => a.BaseStation.BaseStationName);
                        break;
                    case "alarmtype":
                        alarms = query.IsDescending ? alarms.OrderByDescending(a => a.AlarmType.AlarmName)
                                                    : alarms.OrderBy(a => a.AlarmType.AlarmName);
                        break;
                    case "alarmtime":
                        alarms = query.IsDescending ? alarms.OrderByDescending(a => a.HappenTime)
                                                    : alarms.OrderBy(a => a.HappenTime);
                        break;
                    default:
                        alarms = alarms.OrderBy(a => a.Id); // 默认按 Id 排序
                        break;
                }
            }

            // 分页
            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await alarms.Skip(skipNumber)
                               .Take(query.PageSize)
                               .ToListAsync();


        }

    }
}


/*Specification*/
/*
Task 在 C# 中不是一个关键字，它是 .NET 提供的一个类，用于表示异步操作的结果。确实，如果你要定义一个异步方法，方法签名需要使用 async 关键词，比如 public async Task<List<string>> GetDataAsync()。async 告诉编译器和开发者这个方法会包含异步操作。没有 async 关键词就无法使用 await 操作符，异步操作也会失效。

至于 Task<List<string>> 和 Task<List<T_RealAlarm>>，它们都表示返回一个包含 List 数据结构的任务。但任务不一定非要返回 List，它可以返回任意类型的数据结构，比如 Task<int>，Task<string>，甚至 Task（表示不返回任何值的任务）。

举个例子:
csharp

public async Task<int> GetNumberAsync()
{
    await Task.Delay(1000); // 模拟耗时操作
    return 42;
}

这个方法就返回一个 int 类型的任务，既不是 List 也不是 string 类型。

延申：
Task 和 Func，Action 是不一样的。它们解决不同的问题。
    Task：表示一个异步操作。比如你去冲泡咖啡，Task 就是你泡咖啡的那个过程，可以返回一个最终结果（比如咖啡的杯数）。不过它不仅限于异步，也可以表示一个正在进行的同步操作。简单来说，Task 管理的是任务和结果。
    Func 和 Action：都是泛型委托，用于表示方法的签名：
        Func：表示一个带有返回值的方法。比如：
csharp
Func<int, int, int> add = (x, y) => x + y;
var result = add(2, 3); // 返回5

Action：表示一个没有返回值的方法。比如：
csharp
        Action<string> greet = name => Console.WriteLine("Hello, " + name);
        greet("Alice"); // 输出 "Hello, Alice"

总之，Task 处理的是任务及其结果，Func 和 Action 处理的是方法的调用，分别有和没有返回值
*/