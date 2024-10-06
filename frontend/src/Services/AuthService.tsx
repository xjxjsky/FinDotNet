import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

// 定义后端 API 的基本 URL
const api = process.env.REACT_APP_API_URL;//"http://localhost:5177/api/";

// 登录 API 请求函数
export const loginAPI = async (username: string, password: string) => {
  try {
    // 向后端发送 POST 请求，传递用户名和密码，并接收包含用户信息和令牌的响应
    console.log("Jay here api:" + api);
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });
    return data; // 返回响应数据
  } catch (error) {
    handleError(error); // 如果发生错误，调用 handleError 函数处理错误
  }
};

// 注册 API 请求函数
export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    // 向后端发送 POST 请求，传递邮箱、用户名和密码，并接收包含用户信息和令牌的响应
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email: email,
      username: username,
      password: password,
    });
    return data; // 返回响应数据
  } catch (error) {
    handleError(error); // 如果发生错误，调用 handleError 函数处理错误
  }
};

/*
详细解析
    导入依赖：
        axios: 一个用于发送 HTTP 请求的库。
        handleError: 一个自定义的错误处理函数。
        UserProfileToken: 用于描述用户信息和令牌的类型。

    定义基本 URL：
        const api = "http://localhost:5167/api/";: 定义了后端 API 的基本 URL，所有请求都以这个 URL 为基础。

    登录 API 请求函数 (loginAPI)：
        函数签名: export const loginAPI = async (username: string, password: string) => { ... }
            这是一个异步函数，接收用户名和密码作为参数。
        发送请求: const data = await axios.post<UserProfileToken>(api + "account/login", { ... });
            使用 axios.post 方法向后端发送 POST 请求，URL 为 http://localhost:5167/api/account/login。
            传递的请求数据包括用户名和密码。
            响应数据的类型为 UserProfileToken。
        返回数据: return data;
            如果请求成功，返回响应数据。
        错误处理: catch (error) { handleError(error); }
            如果请求失败，捕获错误并调用 handleError 函数处理错误。

    注册 API 请求函数 (registerAPI)：
        函数签名: export const registerAPI = async (email: string, username: string, password: string) => { ... }
            这是一个异步函数，接收邮箱、用户名和密码作为参数。
        发送请求: const data = await axios.post<UserProfileToken>(api + "account/register", { ... });
            使用 axios.post 方法向后端发送 POST 请求，URL 为 http://localhost:5167/api/account/register。
            传递的请求数据包括邮箱、用户名和密码。
            响应数据的类型为 UserProfileToken。
        返回数据: return data;
            如果请求成功，返回响应数据。
        错误处理: catch (error) { handleError(error); }
            如果请求失败，捕获错误并调用 handleError 函数处理错误。

总结
这段代码定义了两个用于用户身份验证的异步函数，通过 axios 库向后端发送 POST 请求，并处理请求过程中可能发生的错误。如果请求成功，将响应数据返回；
如果请求失败，将错误传递给自定义的 handleError 函数进行处理。这样可以确保在前端与后端通信时，有良好的错误处理机制，提高用户体验。
***************************************************************************************************************************************
### Detailed Explanation

1. **Import Dependencies**:
   - **axios**: A library used for sending HTTP requests.
   - **handleError**: A custom error-handling function.
   - **UserProfileToken**: A type used to describe user information and token.

2. **Define Base URL**:
   - `const api = "http://localhost:5167/api/";`: Defines the base URL for the backend API. All requests are based on this URL.

3. **Login API Request Function (`loginAPI`)**:
   - **Function Signature**:
     ```typescript
     export const loginAPI = async (username: string, password: string) => { ... }
     ```
     This is an asynchronous function that takes a username and password as parameters.
   - **Send Request**:
     ```typescript
     const data = await axios.post<UserProfileToken>(api + "account/login", { ... });
     ```
     Uses `axios.post` to send a POST request to the backend with the URL `http://localhost:5167/api/account/login`. The request payload includes the username and password. The response data type is `UserProfileToken`.
   - **Return Data**:
     ```typescript
     return data;
     ```
     If the request is successful, it returns the response data.
   - **Error Handling**:
     ```typescript
     catch (error) { handleError(error); }
     ```
     If the request fails, it catches the error and calls the `handleError` function to process it.

4. **Register API Request Function (`registerAPI`)**:
   - **Function Signature**:
     ```typescript
     export const registerAPI = async (email: string, username: string, password: string) => { ... }
     ```
     This is an asynchronous function that takes an email, username, and password as parameters.
   - **Send Request**:
     ```typescript
     const data = await axios.post<UserProfileToken>(api + "account/register", { ... });
     ```
     Uses `axios.post` to send a POST request to the backend with the URL `http://localhost:5167/api/account/register`. 
     The request payload includes the email, username, and password. The response data type is `UserProfileToken`.
   - **Return Data**:
     ```typescript
     return data;
     ```
     If the request is successful, it returns the response data.
   - **Error Handling**:
     ```typescript
     catch (error) { handleError(error); }
     ```
     If the request fails, it catches the error and calls the `handleError` function to process it.

### Summary

This code defines two asynchronous functions for user authentication: one for logging in and one for registering. 
They use the `axios` library to send POST requests to the backend and handle any errors that occur during these requests. 
If a request is successful, it returns the response data; if it fails, it passes the error to a custom error-handling function. 
This ensures effective error handling during communication between the front end and back end, enhancing the user experience.
*/
