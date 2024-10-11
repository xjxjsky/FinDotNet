import React, { useEffect, useState } from "react";
//import { useParams } from "react-router";
import Sidebar from "../../Components/Siderbar/Sidebar";
import Spinner from "../../Components/Spinner/Spinner";
import { realAlarmDataGetAPI } from "../../Services/AlarmService";
import RealAlarmDashBoard from "../../Components/Alarm/RealAlarmDashBoard";
//import { AlarmProfile } from "../../common";  AlarmProfile已废弃，AlarmGet实体在Models文件夹中的RealAlarm.ts中已定义
import { AlarmGet } from "../../Models/RealAlarm";

interface Props {
  message: string;
}

const RealAlarmPage = (props: Props) => {
  const [alarms, setAlarms] = useState<AlarmGet[]>([]); // 存储告警数组
  const [loading, setLoading] = useState<boolean>(true); // 加载状态
  
  useEffect(() => {
    const getAlarmInit = async () => {
      try {
        const result = await realAlarmDataGetAPI(); // result 可能为 undefined
        if (result?.data?.[0]) {
          setAlarms(result.data); // 设置告警数组
        } else {
          setAlarms([]);
        }
      } catch (error) {
        console.error("Error fetching alarm data:", error);
      } finally {
        // 这里可以放置任何需要在请求完成后执行的逻辑，比如隐藏 loading 动画等
        setLoading(false); // 请求完成后设置加载状态
      }
    };
  
    getAlarmInit(); // 调用异步函数
  }, []); // 依赖项为空数组，意味着只会在组件挂载时运行一次
  
   // 定义侧边栏链接
  const alarmLinks = [
    { to: "Real-alarm", label: "Real Alarm Table" },
    { to: "Create Real-alarm", label: "Create Real Alarm" },
    { to: "Update Real-alarm", label: "Update Real Alarm" },
    { to: "Delete Real-alarm", label: "Delete Real Alarm" },

  ];
  return ( 
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full relative flex ct-docs-disable-sidebar-content">
          <Sidebar links={alarmLinks} title="Alarm Dashboard" />
          <RealAlarmDashBoard message={props.message} alarms={alarms}>
            {/* 主内容区域，显示具体数据 */}
          </RealAlarmDashBoard>
        </div>
      )}
    </>
  );
};

export default RealAlarmPage;
