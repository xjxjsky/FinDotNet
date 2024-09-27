import React from "react";
import { AlarmGet } from "../../Models/RealAlarm";

interface AlarmTableProps {
  alarms: AlarmGet[];
}

const AlarmTable: React.FC<AlarmTableProps> = ({ alarms }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Happen Time</th>
            <th className="py-3 px-6 text-left">Base Station</th>
            <th className="py-3 px-6 text-left">Alarm Type</th>
            <th className="py-3 px-6 text-left">Company</th>
            <th className="py-3 px-6 text-left">Operator</th>
            <th className="py-3 px-6 text-left">Phone Number</th>
            <th className="py-3 px-6 text-left">Is Fixed</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Duration</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {alarms.map((alarm, index) => (
            // 使用条件渲染来改变背景颜色
            <tr key={alarm.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-blue-100" : ""}`}>
              <td className="py-4 px-6">{alarm.id}</td>
              <td className="py-4 px-6">{new Date(alarm.happenTime).toLocaleString()}</td>
              <td className="py-4 px-6">{alarm.baseStationName}</td>
              <td className="py-4 px-6">{alarm.alarmTypeName}</td>
              <td className="py-4 px-6">{alarm.companyName}</td>
              <td className="py-4 px-6">{alarm.opertionerName}</td>
              <td className="py-4 px-6">{alarm.phoneNumber}</td>
              <td className="py-4 px-6">
                {alarm.isFixed ? (
                  <span className="text-green-600 font-semibold">Fixed</span>
                ) : (
                  <span className="text-red-600 font-semibold">Not Fixed</span>
                )}
              </td>
              <td className="py-4 px-6">{alarm.alarmStatusDescription}</td>
              <td className="py-4 px-6">{alarm.alarmDuration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlarmTable;
