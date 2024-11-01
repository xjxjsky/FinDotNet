// Layout.tsx
import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Siderbar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the default styles

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // 获取当前路径

  // 定义不需要显示 Sidebar 的路径
  const noSidebarPaths = ["/", "/login", "/register", "/ResumePage","/ProjectPage", "/some-other-page"];

  // 检查当前路径是否在不显示 Sidebar 的路径列表中
  const shouldShowSidebar = !noSidebarPaths.includes(location.pathname);

  const alarmLinks = [
    { to: "Real-alarm", label: "Real-Alarm Get" },
    { to: "/AlarmSimulatorPage", label: "Simulate-Alarm" },
    { to: "Update Real-alarm", label: "Update-Real-Alarm" },
    { to: "Delete Real-alarm", label: "Delete-Real-Alarm" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* 顶部导航栏 */}
      <Navbar />

      {/* Hamburger Menu 汉堡菜单按钮，仅在小屏幕上显示 */}
        {shouldShowSidebar && (
        <div className="md:hidden fixed top-0 left-0 p-4 z-50">
          <button onClick={toggleSidebar} className="text-black">
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      )}

      {/* 仅在需要显示 Sidebar 时渲染 Sidebar */}
      {shouldShowSidebar && (
        <>
          {/* Sidebar for large screens 侧边栏（大屏幕显示）*/}
          <Sidebar links={alarmLinks} title="Commonly Display" />

          {/* Sidebar overlay for small screens 侧边栏覆盖层（小屏幕显示）*/}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={toggleSidebar}
            >
              <Sidebar links={alarmLinks} title="Alarm Dashboard" />
            </div>
          )}
        </>
      )}

      {/* Toast 消息内容区域 eg. "Login sucessfully...etc." */}
      <ToastContainer />

      {/* Main 内容区域 */}
      <div className="flex pt-20" min-h-screen>
        {/* 根据是否显示 Sidebar 动态调整内容区域的 margin */}
        <main className={`flex-1 ${shouldShowSidebar && !isSidebarOpen ? "ml-64" : "ml-0"} p-4`}>
          <Outlet /> {/* 渲染嵌套路由的内容 */}
        </main>
      </div>
    </>
  );
};

export default Layout;
