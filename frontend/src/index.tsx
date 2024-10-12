import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { UserProvider } from './Context/useAuth';
import './Locales/i18n'; // 确保 i18n 配置在渲染之前导入
//import ErrorBoundary from './ErrorBoundary'; // 新增


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 调试用
import { searchCompanies } from './api';
console.log(searchCompanies("AA"));
const apiKey = process.env.REACT_APP_API_KEY;
console.log("API Key:", apiKey); // 检查是否能正确打印出API Key

root.render(
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 示例 router 创建方式
// 你需要在 ./Routes/Routes.tsx 文件中定义 router
/*
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import RealAlarmPage from "../Pages/RealAlarmPage/RealAlarmPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "Real-alarm",
        element: <RealAlarmPage message="Welcome to Real Alarm Dashboard" />,
      },
      // 其他嵌套路由
    ],
  },
]);
*/


