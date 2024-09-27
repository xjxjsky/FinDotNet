using System;
using api.Helpers;
using api.Models;


namespace api.Interfaces
{
    public interface IAlarmRepository
    {
        Task<List<T_RealAlarm>> GetAllAsync(AlarmQueryObject query);


    }
}