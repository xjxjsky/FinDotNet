import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo-microsoft-120x120.png";
import { useAuth } from "../../Context/useAuth";
import Tooltip from "../Tooltip/Tooltip";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { useTranslation } from "react-i18next"; // 引入 i18next
import { FaGlobe } from "react-icons/fa"; // 导入图标库显示地球图标
import { IoMdArrowDropdown } from "react-icons/io"; // 导入下拉箭头图标
//import { MdLanguage } from "react-icons/md"; // 导入语言图标

interface Props {}

const Navbar: React.FC<Props> = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { t, i18n } = useTranslation(); // 获取 t 函数和 i18n 实例
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false); // 控制语言菜单显示/隐藏
  const [currentLanguage, setCurrentLanguage] = useState("en"); // 当前语言状态

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // 切换语言
    setCurrentLanguage(lng); // 更新当前语言状态
    console.log("Language changed to:", lng); // 添加日志
    setLanguageMenuOpen(false); // 选择语言后关闭菜单
  };

  // 切换语言菜单显示/隐藏
  const toggleLanguageMenu = () => {
    console.log("toggleLanguageMenu here:");
    setLanguageMenuOpen(!languageMenuOpen);
  };

  return (
    <nav className="relative w-full mx-auto p-6 bg-black">
      <div className="flex flex-wrap items-center justify-between text-white">
        <div className="flex items-center space-x-10">
          <Link to="/" className="link-no-click">
            <img src={logo} alt="Logo" className="w-12 h-auto" />
          </Link>
          <div className="hidden font-bold lg:flex space-x-6">
            <Tooltip tooltipText={t("tooltip_search_stock")}>
              <Link
                to="/search"
                className="text-white hover:text-gray-300 hover:text-lg transition-all duration-300"
              >
                {t("menu_search_stock")}
              </Link>
            </Tooltip>
            <Tooltip tooltipText={t("tooltip_dashboard")}>
              <Link
                to="/DashBoard"
                className="text-white hover:text-mypurple hover:text-lg transition-all duration-300"
              >
                {t("menu_dashboard")}
              </Link>
            </Tooltip>
            <Tooltip tooltipText={t("tooltip_real_alarm")}>
              <Link
                to="/RealAlarm"
                className="text-white hover:text-blue-400 hover:text-lg transition-all duration-300"
              >
                {t("menu_real_alarm")}
              </Link>
            </Tooltip>
            <Tooltip tooltipText={t("tooltip_design_guide")}>
              <Link
                to="/design-guide"
                className="text-white hover:text-green-600 hover:text-lg transition-all duration-300"
              >
                {t("menu_design_guide")}
              </Link>
            </Tooltip>
            <DropDownMenu title={t("multi_fun_menu")}>
              <Link to="/submenu1" className="dropdown-link" key="submenu1">
                {t("submenu1")}
              </Link>
              <DropDownMenu title={t("submenu2")} key="submenu2">
                <Link
                  to="/submenu2-1"
                  className="dropdown-link"
                  key="submenu2-1"
                >
                  {t("submenu2_1")}
                </Link>
                <Link
                  to="/submenu2-2"
                  className="dropdown-link"
                  key="submenu2-2"
                >
                  {t("submenu2_2")}
                </Link>
              </DropDownMenu>
              <Link to="/submenu3" className="dropdown-link" key="submenu3">
                {t("submenu3")}
              </Link>
            </DropDownMenu>
            <Tooltip tooltipText={t("tooltip_about")}>
              <Link
                to="/about"
                className="text-white hover:text-yellow-500 hover:text-lg transition-all duration-300"
              >
                {t("menu_about")}
              </Link>
            </Tooltip>
          </div>
        </div>
        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-white">
            <div className="hover:text-darkBlue">
              {t("welcome")}, {user?.userName}
            </div>
            {/* 语言切换按钮 */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-white"
              >
                <FaGlobe className="mr-2" />
                {currentLanguage === "en" ? "🇺🇸 English" : "🇨🇳 中文"}{" "}
                <IoMdArrowDropdown />
              </button>
              {/* 语言下拉菜单 */}
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-lg shadow-xl">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-200 w-full text-left"
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => changeLanguage("zh")}
                    className="flex items-center px-4 py-2 text-sm text-black hover:bg-gray-200 w-full text-left"
                  >
                    🇨🇳 中文
                  </button>
                  {/* 可以根据需要添加更多语言 */}
                </div>
              )}
            </div>
            <a
              onClick={logout}
              className="px-6 py-2 font-bold rounded text-white bg-lightGreen hover:opacity-70 cursor-pointer"
            >
              {t("logout")}
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/login" className="hover:text-darkBlue">
              {t("login")}
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              {t("signup")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
