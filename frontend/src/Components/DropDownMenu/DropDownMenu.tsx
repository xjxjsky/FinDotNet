// src/Components/DropDownMenu/DropDownMenu.tsx
import React from "react";
import "./DropDownMenu.css"; // 确保路径和文件名正确
//import { useTranslation } from "react-i18next"; // 引入 i18next

interface DropDownMenuProps {
  title: string;
  children: React.ReactNode;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ title, children }) => {
  return (
    <div className="relative group">
      <button className="flex items-center text-white hover:text-blue-400 hover:text-lg transition-all duration-300 focus:outline-none">
        {title}
        <svg
          className="ml-1 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="dropdown-content">
        {children}
      </div>
    </div>
  );
};

export default DropDownMenu;
