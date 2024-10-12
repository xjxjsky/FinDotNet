import React from "react";
//import { Outlet } from "react-router-dom";
import "./RealAlarmDashBoard.css"; // 确保路径正确
import AlarmTable from "./AlarmTable"; // 导入 AlarmTable 组件
import { AlarmGet } from "../../Models/RealAlarm";

interface Props {
  message: string;
  alarms: AlarmGet[]; // 接收告警数组
  children?: React.ReactNode;
}

//由于布局已由 Layout 统一管理，RealAlarmDashBoard 只需要专注于展示告警数据。移除了包含 Outlet 的部分，因为在当前结构中不需要嵌套路由。保持了表格的横向滚动设置。
const RealAlarmDashBoard: React.FC<Props> = ({
  message,
  alarms,
  children,
}): JSX.Element => {
  return (
    <div className="bg-blueGray-100 w-full bg-lightBlue-500 p-4 min-h-screen"> {/* 确保占满页面高度 */}
      <div className="custom-text text-center lg:text-left mb-2 mt-2">
        {message}
      </div>

        <div className="flex-grow overflow-y-auto"> {/* 确保纵向可以滚动 */}
          <AlarmTable alarms={alarms} /> {/* 渲染 AlarmTable */}
        </div>
        
      {/* 如果没有嵌套路由，可以删除 Outlet */}
      {/* <div className="flex flex-wrap mt-10">
            <Outlet />
          </div> */}
    </div>
  );
};

export default RealAlarmDashBoard;
