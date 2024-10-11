import React from "react";
import { Outlet } from "react-router-dom";
import "./RealAlarmDashBoard.css"; // 确保路径正确
import AlarmTable from "./AlarmTable"; // 导入 AlarmTable 组件
import { AlarmGet } from "../../Models/RealAlarm";

interface Props {
  message: string;
  alarms: AlarmGet[]; // 接收告警数组
  children?: React.ReactNode;
}

const RealAlarmDashBoard: React.FC<Props> = ({
  message,
  alarms,
  children,
}): JSX.Element => {
  return (
    <div className="relative md:ml-64 bg-blueGray-100 w-full bg-lightBlue-500">
      <div className="px-4 md:px-6 mx-auto max-w-screen-xl w-full pt-10"> {/* 调整 padding 以减少顶部空间 */} {/* 添加 max-w-screen-xl */}
        <div className="custom-text text-center lg:text-left mb-2 mt-2"> {/* 可以根据需要调整 mb 和 mt */}
          {message}
        </div>

        <div className="overflow-x-auto">
          <AlarmTable alarms={alarms} /> {/* 渲染 AlarmTable */}
        </div>
        
        <div className="flex flex-wrap mt-10">
          {/* 使用 Outlet 用于嵌套路由 */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RealAlarmDashBoard;
