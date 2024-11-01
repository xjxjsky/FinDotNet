import React, { useEffect, useState } from "react";
import { simulateAlarm } from "../../Services/SimulateAlarmToBackend"; // 引入模拟告警的函数
//import { toast } from "react-toastify"; 暂时不用

// 定义通信方式的类型
type CommunicationMethod = "REST" | "GraphQL" | "gRPC" | "SignalR";
// 定义告警级别的类型
type Severity = "Critical" | "Major" | "Minor" | "Warning";

interface Props {
  message: string;
}

// 获取当前系统时间，格式为 YYYY-MM-DD HH:mm:ss
const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始，因此需要加1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const AlarmSimulatorPage: React.FC<Props> = ({ message }) => {
  const [selectedMethod, setSelectedMethod] =
    useState<CommunicationMethod>("REST");

  //Alarm告警体数据结构
  const [alarmName, setAlarmName] = useState("");
  const [severity, setSeverity] = useState<Severity>("Minor"); // 新增告警级别状态，默认值为 'Minor'
  const [hanppenTime, setHappenTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("06199888021");
  const [operatorName, setOperatorName] = useState<string>(
    "Telstra Operatior Name"
  );
  const [companyName, setCompanyName] = useState<string>(
    "TeleCom Distributor Name"
  );
  const [baseStationId, setBaseStationId] = useState("BS_001"); //Basestation ID
  const [alarmType, setAlarmType] = useState("AL_001"); // Alarm type code

  //增加数据库三个字段备用
  const [remark001, setRemark001] = useState("remark001");
  const [remark002, setRemark002] = useState("remark002");
  const [remark003, setRemark003] = useState("remark003");

  const [errors, setErrors] = useState({
    alarmName: "",
    phoneNumber: "",
    baseStationId: "",
    alarmType: "",
    operationName: "",
    companyName: "",
  });

  // 更新 alarmTime 为当前系统时间（每次加载时刷新时间）
  useEffect(() => {
    const interval = setInterval(() => {
      setHappenTime(getCurrentTime());
    }, 1000); // 每秒更新一次

    return () => clearInterval(interval); // 清理定时器
  }, []);

  const handleMethodChange = (method: CommunicationMethod) => {
    setSelectedMethod(method);
  };

  // 添加验证输入框不能为空的逻辑
  const validateInput = () => {
    let hasError = false;
    const newErrors = {
      alarmName: "",
      phoneNumber: "",
      baseStationId: "",
      alarmType: "",
      operationName: "",
      companyName: "",
    };

    // 验证 alarmName 是否为空
    if (!alarmName) {
      newErrors.alarmName = "Alarm Name is required.";
      hasError = true;
    } else if (alarmName.length > 25) {
      newErrors.alarmName = "Alarm Name cannot exceed 25 characters.";
      hasError = true;
    }

    // 验证 phoneNumber 是否为空以及是否为有效的数字
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required.";
      hasError = true;
    } else if (!/^\d+$/.test(phoneNumber) || phoneNumber.length > 12) {
      newErrors.phoneNumber =
        "Phone Number must be numeric and cannot exceed 12 digits.";
      hasError = true;
    }

    // 验证 baseStationId 是否为空
    if (!baseStationId) {
      newErrors.baseStationId = "BaseStation ID is required.";
      hasError = true;
    } else if (baseStationId.length > 25) {
      newErrors.baseStationId = "BaseStation ID cannot exceed 25 characters.";
      hasError = true;
    }

    // 验证 alarmType 是否为空
    if (!alarmType) {
      newErrors.alarmType = "Alarm Type is required.";
      hasError = true;
    } else if (alarmType.length > 25) {
      newErrors.alarmType = "Alarm Type cannot exceed 25 characters.";
      hasError = true;
    }

    // 验证 operationName 是否为空
    if (!operatorName) {
      newErrors.operationName = "Operation Name is required.";
      hasError = true;
    } else if (operatorName.length > 25) {
      newErrors.operationName = "Operation Name cannot exceed 25 characters.";
      hasError = true;
    }

    // 验证 companyName 是否为空
    if (!companyName) {
      newErrors.companyName = "Company Name is required.";
      hasError = true;
    } else if (companyName.length > 25) {
      newErrors.companyName = "Company Name cannot exceed 25 characters.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (!validateInput()) {
      return; // 如果输入验证不通过，阻止提交
    }

// 示例模拟告警数据 以供参考
/*
// 定义传入数据的接口
interface AlarmData {
  alarmName: string;
  severity?: 'Critical' | 'Warning' | 'Info';
  happenTime?: string;
  phoneNumber?: string;
  operatorName?: string;
  companyName?: string;
  baseStationId?: string;
  alarmType?: string;
  remark001?: string;
  remark002?: string;
  remark003?: string;
}
*/
  const alarmData = {
    alarmName,
    severity,
    hanppenTime,
    phoneNumber,
    operatorName,
    companyName,
    baseStationId,
    alarmType,
    remark001,
    remark002,
    remark003,
  };

    console.log("Alarm Data from UI Page:", alarmData);
    simulateAlarm(selectedMethod, alarmData);
  };

  const renderRadioButton = (value: CommunicationMethod, label: string) => {
    return (
      <label className="flex items-center">
        <input
          type="radio"
          value={value}
          checked={selectedMethod === value}
          onChange={() => handleMethodChange(value)}
          className="form-radio text-blue-500"
        />
        <span className="ml-2">{label}</span>
      </label>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Alarm Simulator</h1>
        <p className="mb-4 text-center">
          Select a communication method to simulate sending alarm notifications:
        </p>

        <div className="text-center">
          <input
            type="text"
            placeholder="Alarm Name"
            value={alarmName}
            onChange={(e) => setAlarmName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded"
          />
          {errors.alarmName && (
            <p className="text-red-500 text-sm">{errors.alarmName}</p>
          )}
          {/* 告警级别选择 */}
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as Severity)}
            className="mt-2 w-full px-4 py-2 border rounded"
          >
            <option value="Critical">Critical</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
            <option value="Warning">Warning</option>
          </select>
          <input
            type="text"
            placeholder="Alarm Happened Time"
            value={hanppenTime}
            onChange={(e) => setHappenTime(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded"
            disabled // 不允许用户修改 alarmTime
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
          <input
            type="text"
            placeholder="Operation Name"
            value={operatorName} // 默认显示 “Telstra Mobile”
            onChange={(e) => setOperatorName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded"
          />
          {errors.operationName && (
            <p className="text-red-500 text-sm">{errors.operationName}</p>
          )}
          <input
            type="text"
            placeholder="Company Name"
            value={companyName} // 默认显示 “Telstra Mobile”
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}
          <input
            type="text"
            placeholder="Base Station ID"
            value={baseStationId}
            onChange={(e) => setBaseStationId(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded"
          />
          {errors.baseStationId && (
            <p className="text-red-500 text-sm">{errors.baseStationId}</p>
          )}
          <input
            type="text"
            placeholder="Alarm Type"
            value={alarmType}
            onChange={(e) => setAlarmType(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded"
          />
          {errors.alarmType && (
            <p className="text-red-500 text-sm">{errors.alarmType}</p>
          )}

          <div className="mt-4">{renderRadioButton("REST", "REST API")}</div>
          <div className="mt-2">{renderRadioButton("GraphQL", "GraphQL")}</div>
          <div className="mt-2">{renderRadioButton("gRPC", "gRPC")}</div>
          <div className="mt-2">{renderRadioButton("SignalR", "SignalR")}</div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmSimulatorPage;
