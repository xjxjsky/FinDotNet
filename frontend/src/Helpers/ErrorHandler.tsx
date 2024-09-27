import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;

    /* 如果没有响应，提示服务器连接问题 */
    if (!err) {
      toast.error("Cannot connect to the Server, please try again later.");
    } else {
      // 1.优先检查并显示具体的错误信息
      if (err.data && err.data.message) {
        toast.error(`Error: ${err.data.message}`);
      } else if (err.status === 401 && !localStorage.getItem("token")) {
        // 仅在未登录且本地没有 token 的情况下显示未授权的提示
        toast.warning("Unauthorized access, please log in.");
        window.history.pushState({}, "LoginPage", "/login");
      } else {
        toast.error(
          "An unknown error occurred, please contact the administrator."
        );
        //toast.error(err.data.message);
      }

      // 2.检查是否有其他的错误详细信息
      if (Array.isArray(err?.data.errors)) {
        for (let val of err?.data.errors) {
          toast.warning(val.description);
        }
      } else if (typeof err?.data.errors === "object") {
        for (let e in err?.data.errors) {
          toast.warning(err.data.errors[e][0]);
        }
      } else if (err?.data) {
        toast.warning(err.data);
      }
    }
  } else {
    toast.error("Unexpected error occurred.");
  }

  /*以下错误处理的老代码注释掉，替换为以上新代码 */
  // if (axios.isAxiosError(error)) {
  //   var err = error.response;
  //   /* add by jasling ---start*/
  //   if (!err) {
  //     // 如果没有响应，可能是服务器没有打开
  //     toast.error("Cannot be connected to the Server, try it later...");
  //   } else {
  //     // 处理其他错误情况
  //     toast.error(err.data.message || "Error! Try it later or Contact the Administrator!");
  //   }
  //   /* add ---end*/

  //   if (Array.isArray(err?.data.errors)) {
  //     for (let val of err?.data.errors) {
  //       toast.warning(val.description);
  //     }
  //   } else if (typeof err?.data.errors === "object") {
  //     for (let e in err?.data.errors) {
  //       toast.warning(err.data.errors[e][0]);
  //     }
  //   } else if (err?.data) {
  //     toast.warning(err.data);
  //   } else if (err?.status == 401) {
  //     toast.warning("Please login");
  //     window.history.pushState({}, "LoginPage", "/login");
  //   } else if (err) {
  //     toast.warning(err?.data);
  //   }
  // }
};
