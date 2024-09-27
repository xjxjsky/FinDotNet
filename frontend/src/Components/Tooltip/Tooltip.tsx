import React from "react";
//import "./Tooltip.css"; // 导入 tooltip CSS 文件

interface TooltipProps {
  children: React.ReactNode;
  tooltipText: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, tooltipText }) => {
  return (
    <div className="relative inline-block">
      {/* 仅当悬停子元素时触发 tooltip */}
      <div className="inline-block relative group">
        {children}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max rounded bg-gray-500 bg-opacity-50 text-blue-400 text-sm p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 pointer-events-none">
          {tooltipText}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
