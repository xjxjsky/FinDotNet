import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { AlarmGet, AlarmPost } from "../Models/RealAlarm";
import * as signalR from '@microsoft/signalr';

//暂时注释掉，等后续有必要重构时再加入
const alarmSimulatorService_api = process.env.REACT_APP_AlarmSimulatorService_API_URL; //"http://localhost:5000/jay/AlarmSimulator/";

// 定义通信方式的类型
type CommunicationMethod = 'REST' | 'GraphQL' | 'gRPC' | 'SignalR';

// 定义传入数据的接口
interface AlarmData {
  alarmName: string;
  severity?: 'Critical' | 'Warning' | 'Info'; // 可选字段，限制可选值
  happenTime?: string; // 时间戳格式，例如 ISO 格式的字符串
  phoneNumber?: string;
  operatorName?: string;
  companyName?: string;
  baseStationId?: string;
  alarmType?: string;
  remark001?: string;
  remark002?: string;
  remark003?: string;
}


// 定义告警消息接口，包括所有字段
interface AlarmMessage {
  alarmId: string;
  severity: string;
  description: string;
  timestamp: string;
  source: string;
  phoneNumber?: string;
  operatorName?: string;
  companyName?: string;
  alarmType?: string;
  remark001?: string;
  remark002?: string;
  remark003?: string;
}


// 更新 generateAlarmMessage 函数以包含所有字段
/*
generateAlarmMessage 中对数据进行预处理和加工有以下优点：
  数据清洗：确保字段有合理的默认值。例如，如果某些重要字段（如 alarmId、severity）为空，函数会生成一个默认值，避免空数据带来的潜在问题。
  字段格式标准化：可能需要对 timestamp 格式化，或者确保 description 一致地包含特定的字段信息，这可以提升日志和追踪的一致性。
  数据完整性和可扩展性：如果 alarmData 的结构发生变化，或未来需要增加新的字段，generateAlarmMessage 可以轻松适应，提供数据的灵活性和一致性。
  代码可维护性：集中数据处理逻辑。如果有多个地方需要相同的数据加工，这样可以在 generateAlarmMessage 中统一完成，减少重复逻辑并降低维护成本。
*/
const generateAlarmMessage = (alarmData: AlarmData): AlarmMessage => {
  return {
    alarmId: alarmData.alarmName || 'ALM' + Math.floor(Math.random() * 10000),
    severity: alarmData.severity || 'Critical',
    description: `Alarm: ${alarmData.alarmName || 'Unknown'}, Type: ${alarmData.alarmType || 'General'}`,
    timestamp: alarmData.happenTime || new Date().toISOString(),
    source: alarmData.baseStationId || 'UnknownBaseStation',
    // 包含 alarmData 的其余字段
    phoneNumber: alarmData.phoneNumber,
    operatorName: alarmData.operatorName,
    companyName: alarmData.companyName,
    alarmType: alarmData.alarmType,
    remark001: alarmData.remark001,
    remark002: alarmData.remark002,
    remark003: alarmData.remark003,
  };
};
  
// 模拟发送告警请求的方法
export const simulateAlarm = async (method: CommunicationMethod, alarmData: any) => {
  // 生成告警消息
  const alarmMessage = generateAlarmMessage(alarmData); // 传递 alarmData 生成告警消息
  console.log('Generated alarm message:', alarmMessage);

  switch (method) {
    case 'REST':
      console.log('Sending alarm using REST API');
      await sendRestAlarm(alarmMessage); // 发送 REST 请求
      break;
    case 'GraphQL':
      console.log('Sending alarm using GraphQL API');
      await sendGraphQLAlarm(alarmMessage); // 发送 GraphQL 请求
      break;
    case 'gRPC':
      console.log('Sending alarm using gRPC API');
      // gRPC 需要特定的客户端库
      break;
    case 'SignalR':
      console.log('Sending alarm using SignalR');
      await sendSignalRAlarm(alarmMessage); // 发送 SignalR 请求
      break;
    default:
      break;
  }
};
  
  // REST API 请求示例
  // const sendRestAlarm = async (alarmMessage: AlarmMessage) => {
  //   try {
  //       const response = await fetch('http://localhost:5000/jay/AlarmSimulator/send-alarm', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(alarmMessage),
  //     });
  //     console.log("sendRestAlarm:" + response);
  //     const result = await response.json();
  //     console.log('REST API response:', result);
  //   } catch (error) {
  //     console.error('Error sending REST alarm:', error);
  //   }
  // };
  export const sendRestAlarm = async (alarmMessage: AlarmMessage) => {
    try {
      console.log("sendRestAlarm currenty api path:" + alarmSimulatorService_api);
      const url = new URL("send-alarm", alarmSimulatorService_api).toString();
      //const data = await axios.post<AlarmPost>(url);
      const data = await axios.post<AlarmPost>(url, alarmMessage, { withCredentials: true });
      console.log("sendRestAlarm:" + data);
      return data;
    } catch (error) {
      console.error('Error sending REST alarm:', error);
      handleError(error);
    }
  };
  
  // GraphQL API 请求示例
  const sendGraphQLAlarm = async (alarmMessage: AlarmMessage) => {
    const mutation = `
      mutation {
        sendAlarm(
          alarmId: "${alarmMessage.alarmId}",
          severity: "${alarmMessage.severity}",
          description: "${alarmMessage.description}",
          timestamp: "${alarmMessage.timestamp}",
          source: "${alarmMessage.source}"
        ) {
          success
          message
        }
      }
    `;
    
    try {
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation }),
      });
      const result = await response.json();
      console.log('GraphQL API response:', result);
    } catch (error) {
      console.error('Error sending GraphQL alarm:', error);
    }
  };
  
  // SignalR 发送告警示例
  const sendSignalRAlarm = async (alarmMessage: AlarmMessage) => {
    try {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5000/hubs/alarm') // 后端 SignalR Hub 的地址
        .build();
  
      // 启动 SignalR 连接
      await connection.start();
      console.log('SignalR Connection established');
  
      // 向后端发送告警消息
      await connection.invoke('SendAlarm', alarmMessage);
      console.log('Alarm message sent:', alarmMessage);
  
      // 停止连接
      await connection.stop();
    } catch (error) {
      console.error('Error sending SignalR alarm:', error);
    }
  };
  

// export const realAlarmDataAddAPI = async (symbol: string) => {
//   try {
//     const data = await axios.post<AlarmPost>(api + `?symbol=${symbol}`);
//     return data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const realAlarmDataDeleteAPI = async (symbol: string) => {
//   try {
//     const data = await axios.delete<AlarmPost>(api + `?symbol=${symbol}`);
//     return data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const realAlarmDataGetAPI = async () => {
//   try {
//     const data = await axios.get<AlarmGet[]>(api);
//     return data;
//   } catch (error) {
//     handleError(error);
//   }
// };


