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