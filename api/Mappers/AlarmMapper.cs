using api.Dtos.Alarm;
using api.Models;

namespace api.Mappers
{
    public static class alarmMapper
    {
        //将数据库模型转换成DTO，用于FrontEnd display
        public static AlarmDto ToAlarmDto(this T_RealAlarm alarmModel)
        {
            return new AlarmDto
            {
                Id = alarmModel.Id,
                HappenTime = alarmModel.HappenTime,
                BaseStationName = alarmModel.BaseStation?.BaseStationName,  // 确保导航属性不为空
                AlarmTypeName = alarmModel.AlarmType?.AlarmName,
                CompanyName = alarmModel.CompanyName,
                OpertionerName = alarmModel.OpertionerName,
                PhoneNumber = alarmModel.PhoneNumber,
                IsFixed = alarmModel.FixOrNot,
                AlarmStatusDescription = alarmModel.FixOrNot ? "already fixed" : "not fixed",  // 动态生成告警状态描述
                AlarmDuration = DateTime.Now - alarmModel.HappenTime          // 计算告警持续时间

            };
        }

        // 将 CreateAlarmRequestDto 映射为 T_RealAlarm (用于创建告警)
        // public static T_RealAlarm ToRealAlarmFromCreatedDTO(this CreateAlarmRequestDto alarmDto)
        // {
        //     return new T_RealAlarm
        //     {
        //         HappenTime = alarmDto.HappenTime,
        //         PhoneNumber = alarmDto.PhoneNumber,
        //         OpertionerName = alarmDto.OpertionerName,
        //         CompanyName = alarmDto.CompanyName,
        //         FixOrNot = alarmDto.FixOrNot,
        //         BaseStation_Id = alarmDto.BaseStation_Id,
        //         AlarmType_Code = alarmDto.AlarmType_Code,
                
        //         // 假设 alarmDto 中包含 BaseStationName 和 AlarmTypeName，我们需要根据这些名称找到对应的实体
        //         BaseStation = new T_BaseStation
        //         {
        //             BaseStationName = "NodeB_001"
        //         },
        //         AlarmType = new T_AlarmType
        //         {
        //             AlarmName = "CPU overheating"
        //         },

        //         // 其他业务逻辑属性可以根据需要进行映射
        //     };
        // }

        // 将 AlarmUpdateDto 映射为 T_RealAlarm (用于更新告警)
        // public static void UpdateRealAlarmFromDto(this T_RealAlarm alarm, AlarmUpdateDto alarmDto)
        // {
        //     alarm.HappenTime = alarmDto.HappenTime;
        //     alarm.BaseStation_Id = alarmDto.BaseStationId;
        //     alarm.AlarmType_Code = alarmDto.AlarmTypeCode;
        //     alarm.CompanyName = alarmDto.CompanyName;
        //     alarm.OpertionerName = alarmDto.OpertionerName;
        //     alarm.PhoneNumber = alarmDto.PhoneNumber;
        //     alarm.FixOrNot = alarmDto.IsFixed;
        // }
    }
}