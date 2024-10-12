// AlarmTable.tsx
import React from "react";
import { AlarmGet } from "../../Models/RealAlarm";

interface AlarmTableProps {
  alarms: AlarmGet[];
}

//关键点：
//使用 min-w-max 和 whitespace-nowrap 类，确保表格宽度根据内容自动扩展，且内容不换行。
//确保 overflow-x-auto 被正确应用到包裹 <table> 的 <div> 上，以启用横向滚动条。
const AlarmTable: React.FC<AlarmTableProps> = ({ alarms }) => {
  return (
    <div className="overflow-x-auto max-h-screen">
      <table className="min-w-max bg-white rounded-lg shadow-lg whitespace-nowrap">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-4 px-6 border-b text-left">ID</th>
            <th className="py-4 px-6 border-b text-left">Happen Time</th>
            <th className="py-4 px-6 border-b text-left">Base Station</th>
            <th className="py-4 px-6 border-b text-left">Alarm Type</th>
            <th className="py-4 px-6 border-b text-left">Company</th>
            <th className="py-4 px-6 border-b text-left">Operator</th>
            <th className="py-4 px-6 border-b text-left">Phone Number</th>
            <th className="py-4 px-6 border-b text-left">Is Fixed</th>
            <th className="py-4 px-6 border-b text-left">Status</th>
            <th className="py-4 px-6 border-b text-left">Duration</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {alarms.map((alarm, index) => (
            <tr key={alarm.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-blue-100" : ""}`}>
              <td className="py-4 px-6 border-b text-left">{alarm.id}</td>
              <td className="py-4 px-6 border-b text-left">{new Date(alarm.happenTime).toLocaleString()}</td>
              <td className="py-4 px-6 border-b text-left">{alarm.baseStationName}</td>
              <td className="py-4 px-6 border-b text-left">{alarm.alarmTypeName}</td>
              <td className="py-4 px-6 border-b text-left">{alarm.companyName}</td>
              <td className="py-4 px-6 border-b text-left">{alarm.opertionerName}</td>
              <td className="py-4 px-6 border-b text-left truncate" title={alarm.phoneNumber}>
                {alarm.phoneNumber}
              </td>
              <td className="py-4 px-6 border-b text-left">
                {alarm.isFixed ? (
                  <span className="text-green-600 font-semibold">Fixed</span>
                ) : (
                  <span className="text-red-600 font-semibold">Not Fixed</span>
                )}
              </td>
              <td className="py-4 px-6 border-b text-left">{alarm.alarmStatusDescription}</td>
              <td className="py-4 px-6 border-b text-left">{alarm.alarmDuration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlarmTable;
