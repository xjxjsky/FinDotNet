import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Context/useAuth";
import { useForm } from "react-hook-form";

type Props = {};

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = (props: Props) => {
  const { loginUser } = useAuth(); // 从上下文中获取登录函数
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) }); // 使用 useForm 钩子初始化表单

  const handleLogin = (fuckForm: LoginFormsInputs) => {
    loginUser(fuckForm.userName, fuckForm.password); // 处理表单提交
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  {...register("userName")}
                />
                {errors.userName ? (<p className="text-white">{errors.userName.message}</p>) : ("")}
              </div>
              <div> 
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                />
                {errors.password ? (<p className="text-white">{errors.password.message}</p>) : ("")}
              </div>
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-white font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-lightGreen hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">Don’t have an account yet?{" "}
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

/*
前端与后端 API 交互流程

    用户登录或注册：
        用户在前端输入用户名和密码，并点击登录或注册按钮。
        前端调用 useAuth.tsx 中的 loginUser 或 registerUser 函数。
        这些函数调用 AuthService.tsx 中相应的 API 函数，发送请求到后端。
        如果请求成功，后端返回用户信息和 token。
        前端将用户信息和 token 存储在 localStorage 中，并更新上下文状态。
        如果请求失败，handleError 函数会捕获错误并显示提示框。

    用户状态管理：
        前端使用 useAuth 钩子访问用户状态和操作（如登录、注册、登出、检查是否登录）。
        UserProvider 组件在应用启动时检查 localStorage 中的用户信息和 token，并更新上下文状态。

通过这种方式，前端能够与后端 API 进行交互，处理用户认证，并在必要时显示错误提示框。
**************************************************************************************************************
### Frontend and Backend API Interaction Workflow

1. **User Login or Registration**:
   - **User Action**:
     The user enters a username and password on the frontend and clicks the login or register button.
   - **Frontend Call**:
     The frontend calls the `loginUser` or `registerUser` functions from `useAuth.tsx`.
   - **API Request**:
     These functions call the corresponding API functions in `AuthService.tsx` to send a request to the backend.
   - **Successful Response**:
     If the request is successful, the backend returns user information and a token.
   - **Update Storage and State**:
     The frontend stores the user information and token in `localStorage` and updates the context state.
   - **Error Handling**:
     If the request fails, the `handleError` function captures the error and displays a notification.

2. **User State Management**:
   - **Accessing User State**:
     The frontend uses the `useAuth` hook to access user state and perform actions such as login, register, logout, and check if the user is logged in.
   - **Initial Context Setup**:
     The `UserProvider` component checks `localStorage` for user information and token when the application starts and updates the context state accordingly.

In this way, the frontend interacts with the backend API, handles user authentication, and displays error notifications when necessary.
*/