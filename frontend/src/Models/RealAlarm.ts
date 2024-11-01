export type AlarmPost = {
  title: string;
  content: string;
};

export interface AlarmGet {
  id: number;                     // 唯一标识符
  happenTime: string;             // 发生时间，ISO 8601 格式的字符串
  baseStationName: string;        // 基站名称
  alarmTypeName: string;          // 告警类型名称
  companyName: string;            // 公司名称
  opertionerName: string;         // 操作员名称（注意拼写错误，应为 "operatorName"）
  phoneNumber: string;            // 电话号码
  isFixed: boolean;               // 是否已修复
  alarmStatusDescription: string;  // 告警状态描述
  alarmDuration: string;          // 告警持续时间
}


