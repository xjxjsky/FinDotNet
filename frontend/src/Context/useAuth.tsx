import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

// 定义 UserContext 的类型，包括用户信息、令牌以及用户注册、登录、登出和检查登录状态的方法
type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

// 创建 UserContext 
//第1种写法：const UserContext = createContext<UserContextType>({} as UserContextType);这种写法假设 UserContext 总是有一个默认值，即使这个值是一个空对象 {}。这在某些情况下可能会简化代码，因为你不需要处理 undefined 的情况，但也可能隐藏潜在的错误。
//这种写法更安全，因为它明确表示 UserContext 可能为 undefined。在使用 useContext 时，你需要处理 undefined 的情况，这可以防止在没有 Provider 包裹的情况下出现意外错误。
//Sum in one, 推荐： 如果希望代码更健壮并且能够明确处理 undefined 的情况，第2种写法更靠谱。如果确定 UserContext 总是会有一个默认值，并且希望简化代码逻辑，第1种写法也可以接受。
const UserContext = createContext<UserContextType | undefined>(undefined); //选择第2种写法，更健壮！

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate(); // 使用 useNavigate 来进行页面导航
  const [token, setToken] = useState<string | null>(null); // 用于存储用户令牌的状态
  const [user, setUser] = useState<UserProfile | null>(null); // 用于存储用户信息的状态
  const [isReady, setIsReady] = useState(false); // 用于表示初始化是否完成的状态

  // 使用 useEffect 来在组件挂载时进行初始化
  useEffect(() => {
    const user = localStorage.getItem("user"); // 从本地存储获取用户信息
    const token = localStorage.getItem("token"); // 从本地存储获取令牌
    if (user && token) {
      setUser(JSON.parse(user)); // 将用户信息设置到状态中
      setToken(token); // 将令牌设置到状态中
      axios.defaults.headers.common["Authorization"] = "Bearer " + token; // 设置 axios 默认的 Authorization 头部
    }
    setIsReady(true); // 设置初始化完成
  }, []);

  // 注册用户的方法
  const registerUser = async (email: string, username: string, password: string) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token); // 将令牌存储到本地存储
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj)); // 将用户信息存储到本地存储
          setToken(res?.data.token!); // 更新令牌状态
          setUser(userObj!); // 更新用户状态
          toast.success("Login Success!"); // 显示成功提示
          navigate("/search"); // 导航到 /search 页面
        }
      })
      .catch((e) => toast.warning("Server error occurred")); // 处理错误并显示警告提示
  };

  // 登录用户的方法
  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token); // 将令牌存储到本地存储
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj)); // 将用户信息存储到本地存储
          setToken(res?.data.token!); // 更新令牌状态
          setUser(userObj!); // 更新用户状态

          //你在 useEffect 中设置了 axios 的默认 Authorization 头部：如果 token 设置未及时更新，可能会导致后续的 API 请求出现未授权的情况。
          //因此，建议在成功登录并设置 token 后，再进行任何带有授权的请求。
          axios.defaults.headers.common["Authorization"] = "Bearer " + res?.data.token; //js added by handling 401 unauthorized error
          
          toast.success("Login Success!"); // 显示成功提示
          navigate("/search"); // 导航到 /search 页面
        }
      })
      .catch((e) => toast.warning("Server error occurred")); // 处理错误并显示警告提示
  };

  // 检查用户是否已登录的方法
  const isLoggedIn = () => {
    return !!user; // 如果用户信息存在，返回 true，否则返回 false
  };

  // 用户登出的方法
  const logout = () => {
    localStorage.removeItem("token"); // 移除本地存储中的令牌
    localStorage.removeItem("user"); // 移除本地存储中的用户信息
    setUser(null); // 清空用户状态
    setToken(null);//setToken(""); // 清空令牌状态, 使用空字符串 "" 表示令牌为空。这种方式也可以表示没有令牌，但在某些情况下，空字符串可能会被误认为是有效的非空值。使用 setToken(null) 更加直观和安全，因为它明确表示令牌不存在，避免了空字符串可能带来的混淆。
    navigate("/"); // 导航到根路径
  };

  if (!isReady) {
    return null; // 或者加载一个加载指示器
  }

  return (
    // 提供 UserContext.Provider 给子组件使用,  // 在初始化完成后才渲染子组件
    <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}>
      {isReady ? children : null} 
    </UserContext.Provider>
  );
};

// 自定义 Hook，用于在组件中访问 UserContext
//export const useAuth = () => React.useContext(UserContext);
// 自定义 Hook，用于在组件中访问 UserContext
export const useAuth = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};

/*
useAuth.tsx 文件是一个 React 上下文，用于管理用户身份验证状态（例如用户信息和 token）。它使用 AuthService.tsx 中定义的 API 函数来与后端交互。
代码概述

    导入模块和类型定义： 引入 React 的 createContext、useEffect、useState 等模块，并定义 UserContextType 类型来描述用户上下文中的数据和方法。

    创建上下文： 使用 createContext 创建一个空的 UserContext。

    UserProvider 组件：
        定义状态变量 token、user 和 isReady 来管理用户信息和初始化状态。
        使用 useEffect 从本地存储中获取用户和令牌信息，并将其存储到状态中，同时设置 axios 的默认 Authorization 头部。
        定义 registerUser 方法，用于注册新用户，并在注册成功后将用户和令牌信息存储到本地存储中，更新状态，并显示提示信息。
        定义 loginUser 方法，用于用户登录，并在登录成功后将用户和令牌信息存储到本地存储中，更新状态，并显示提示信息。
        定义 isLoggedIn 方法，返回用户是否已登录。
        定义 logout 方法，清空本地存储和状态中的用户和令牌信息，并导航到根路径。

    导出上下文提供者和自定义 Hook： 导出 UserProvider 组件和 useAuth 自定义 Hook，方便在其他组件中使用用户上下文。

这样做可以让你在整个应用中方便地管理和访问用户的登录状态和信息，同时也能处理用户注册和登录过程中的错误，并显示适当的提示信息。
**************************************************************************************************************************************
The useAuth.tsx file is a React context used to manage user authentication state (e.g., user information and token). It interacts with the backend through API functions defined in AuthService.tsx. Here's an overview of the code and its functionality:

    Import Modules and Type Definitions:
        Imports React's createContext, useEffect, useState, and other modules.
        Defines the UserContextType type to describe the data and methods in the user context.

    Create Context:
        Uses createContext to create an empty UserContext.

    UserProvider Component:
        State Variables: Defines state variables token, user, and isReady to manage user information and initialization state.
        useEffect: Retrieves user and token information from local storage and updates the state. Sets the default Authorization header for axios.
        registerUser Method: Registers a new user, stores user and token information in local storage, updates state, and shows a success message.
        loginUser Method: Logs in a user, stores user and token information in local storage, updates state, and shows a success message.
        isLoggedIn Method: Returns whether the user is logged in.
        logout Method: Clears user and token information from local storage and state, and navigates to the root path.

    Export Context Provider and Custom Hook:
        Exports the UserProvider component and useAuth custom hook for use in other components to access user context.

This setup allows you to easily manage and access user login state and information throughout your application. It also handles errors during user registration and login, providing appropriate feedback.
*/
