import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo-microsoft-120x120.png";
import { useAuth } from "../../Context/useAuth";
import Tooltip from "../Tooltip/Tooltip";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const { isLoggedIn, user, logout } = useAuth();
  console.log("isLoggedIn:", isLoggedIn); // For debugging

  const { t, i18n } = useTranslation();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false); // 控制移动菜单的显示/隐藏

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    console.log("Language changed to:", lng);
    setLanguageMenuOpen(false);
  };

  const toggleLanguageMenu = () => {
    console.log("toggleLanguageMenu here:");
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black shadow-md z-50 p-6">
      <div className="flex items-center justify-between text-white">
        {/* 左侧内容 */}
        <div className="flex items-center space-x-10">
          <Link to="/" className="link-no-click">
            <img src={logo} alt="Logo" className="w-12 h-auto" />
          </Link>
          {/* 大屏幕下的导航项 */}
          <div className="hidden lg:flex space-x-6">
            <Tooltip tooltipText={t("tooltip_search_stock")}>
              <Link
                to="/search"
                className="text-white no-underline hover:text-gray-300 hover:text-lg transition-all duration-300"
              >
                {t("menu_search_stock")}
              </Link>
            </Tooltip>
            <Tooltip tooltipText={t("tooltip_dashboard")}>
              <Link
                to="/DashBoard"
                className="text-white no-underline hover:text-mypurple hover:text-lg transition-all duration-300"
              >
                {t("menu_dashboard")}
              </Link>
            </Tooltip>
            <Tooltip tooltipText={t("tooltip_real_alarm")}>
              <Link
                to="/RealAlarm"
                className="text-white no-underline hover:text-blue-400 hover:text-lg transition-all duration-300"
              >
                {t("menu_real_alarm")}
              </Link>
            </Tooltip>
            <Tooltip tooltipText={t("tooltip_design_guide")}>
              <Link
                to="/design-guide"
                className="text-white no-underline hover:text-green-600 hover:text-lg transition-all duration-300"
              >
                {t("menu_design_guide")}
              </Link>
            </Tooltip>
            <DropDownMenu title={t("multi_fun_menu")}>
              <Link to="/submenu1" className="dropdown-link no-underline" key="submenu1">
                {t("submenu1")}
              </Link>
              <DropDownMenu title={t("submenu2")} key="submenu2">
                <Link
                  to="/submenu2-1"
                  className="dropdown-link no-underline"
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
                to="/ResumePage"
                className="text-white no-underline hover:text-yellow-500 hover:text-lg transition-all duration-300"
              >
                {t("menu_about")}
              </Link>
            </Tooltip>
          </div>
        </div>
        {/* 右侧内容 */}
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

        {/* 汉堡菜单图标 */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* 移动设备下的导航菜单 */}
      {menuOpen && (
        <div className="lg:hidden mt-4">
          <div className="flex flex-col space-y-4">
            <Tooltip tooltipText={t("tooltip_search_stock")}>
              <Link
                to="/search"
                className="text-white no-underline hover:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                {t("menu_search_stock")}
              </Link>
            </Tooltip>
            <Tooltip tooltipText={t("tooltip_dashboard")}>
              <Link
                to="/DashBoard"
                className="text-white no-underline hover:text-mypurple"
                onClick={() => setMenuOpen(false)}
              >
                {t("menu_dashboard")}
              </Link>
            </Tooltip>
            <Tooltip tooltipText={t("tooltip_real_alarm")}>
              <Link
                to="/RealAlarm"
                className="text-white no-underline hover:text-blue-400"
                onClick={() => setMenuOpen(false)}
              >
                {t("menu_real_alarm")}
              </Link>
            </Tooltip>
            <Tooltip tooltipText={t("tooltip_design_guide")}>
              <Link
                to="/design-guide"
                className="text-white no-underline hover:text-green-600"
                onClick={() => setMenuOpen(false)}
              >
                {t("menu_design_guide")}
              </Link>
            </Tooltip>
            <DropDownMenu title={t("multi_fun_menu")}>
              <Link
                to="/submenu1"
                className="dropdown-link no-underline"
                key="submenu1"
                onClick={() => setMenuOpen(false)}
              >
                {t("submenu1")}
              </Link>
              <DropDownMenu title={t("submenu2")} key="submenu2">
                <Link
                  to="/submenu2-1"
                  className="dropdown-link no-underline"
                  key="submenu2-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("submenu2_1")}
                </Link>
                <Link
                  to="/submenu2-2"
                  className="dropdown-link"
                  key="submenu2-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("submenu2_2")}
                </Link>
              </DropDownMenu>
              <Link
                to="/submenu3"
                className="dropdown-link"
                key="submenu3"
                onClick={() => setMenuOpen(false)}
              >
                {t("submenu3")}
              </Link>
            </DropDownMenu>
            <Tooltip tooltipText={t("tooltip_about")}>
              <Link
                to="/ResumePage"
                className="text-white no-underline hover:text-yellow-500"
                onClick={() => setMenuOpen(false)}
              >
                {t("menu_about")}
              </Link>
            </Tooltip>
            {/* 登录状态相关项 */}
            {isLoggedIn() ? (
              <>
                <div className="text-white">
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
                  {languageMenuOpen && (
                    <div className="absolute mt-2 py-2 w-40 bg-white rounded-lg shadow-xl">
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
                    </div>
                  )}
                </div>
                <a
                  onClick={logout}
                  className="px-6 py-2 font-bold rounded text-white bg-lightGreen hover:opacity-70 cursor-pointer"
                >
                  {t("logout")}
                </a>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-darkBlue">
                  {t("login")}
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 font-bold rounded text-white bg-lightGreen hover:opacity-70"
                >
                  {t("signup")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
