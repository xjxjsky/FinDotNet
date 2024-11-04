import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import App from "../App";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignGuide from "../Pages/DesignGuide/DesignGuide";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import DashBoardPage from "../Pages/DashBoardPage/DashBoardPage";
import RealAlarmPage from "../Pages/RealAlarmPage/RealAlarmPage";
import ResumePage from "../Pages/ResumePage/ResumePage";
import DematicPage from "../Pages/DematicPage/DematicPage";
import ProjectPage from "../Pages/ProjectPage/ProjectPage";
import Layout from "../Layout";
import { UserProvider } from "../Context/useAuth";
import AlarmSimulatorPage from "../Pages/AlarmSimulatorPage/AlarmSimulatorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element:  (     
      <UserProvider> {/* 包裹 RouterProvider */}
        <Layout />
      </UserProvider>
    ), // 使用 Layout 作为根路由， 移除 //element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      
      { path: "login", element: <LoginPage /> },
      
      { path: "register", element: <RegisterPage /> },
      
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },

      { path: "DashBoard", element: <DashBoardPage message={"Hello, Dash Board! created by Jay! I dont think how to present or render this page yet, give me some time to think about it! I gonna give you spectacle and prestige showcase! Let's dive in programming! Thank you!"} /> },

      { path: "RealAlarm", element: <RealAlarmPage message={"Alarm Table Demo - [Simulating ZTE Corp's Alarm Business Data]"} /> },

      { path: "AlarmSimulatorPage", element: <AlarmSimulatorPage message={"[Simulating to send ZTE Corp's Alarm Business Data to Back Server.]"} /> },

      { path: "Design-guide", element: <DesignGuide /> },

      { path: "ResumePage", element: <ResumePage label={""} onClick={function (): void {throw new Error("Function not implemented.");} } /> },

      { path: "DematicPage", element: <DematicPage label={"Dematic Company"} onClick={function (): void {throw new Error("Function not implemented.");} } /> },
      
      { path: "ProjectPage", element: <ProjectPage label={""} onClick={function (): void {throw new Error("Function not implemented.");} } /> },

      {
        path: "company/:ticker",
        element: (
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        ),
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatement /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashFlowStatement /> },
        ],
      },
    ],
  },
]);
