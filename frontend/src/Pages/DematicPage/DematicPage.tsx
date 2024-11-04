import React, { useState, useRef, useEffect } from "react";
import "./DematicPage.css";
import ScrollToTop from "../../Components/HelperComponents/ScrollToTop";
import { ApiOutlined } from "@mui/icons-material";
import axios, { AxiosError } from "axios";

// 定义 Props 类型
type Props = {
  label: string;
  onClick: () => void;
};

// 创建一个函数组件并使用 Props 类型
const DematicPage: React.FC<Props> = ({ label, onClick }) => {
  // 定义状态变量
  const [inputFormat, setInputFormat] = useState<"XML" | "JSON">("JSON");
  const [inputData, setInputData] = useState(`{
                                                "Maths": {
                                                    "Operation": {
                                                      "@ID": "Plus",
                                                      "Value": ["2","3"],
                                                      "Operation": {
                                                        "@ID": "Multiplication",
                                                        "Value": ["4","5"]
                                                      }
                                                    }
                                                  }
                                                }`);
  const [result, setResult] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState<boolean>(false); // 添加加载状态

  // 自适应高度调整
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputData]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 先重置高度
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 500 * 1.5; // 假设每行约为 1.5em
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  };

  // 根据 inputFormat 选择正确的 API 端点
  // const endpoint = inputFormat === "XML" ? "calculate/xml" : "calculate/json";
  // const api = `${process.env.REACT_APP_API_URL}DematicCalculatorService/${endpoint}`;
  const handleSubmit = async () => {
    const api = `${process.env.REACT_APP_API_URL}DematicCalculatorService/calculate`;
    console.info("API endpoint:", api);
    setLoading(true);

    // Check if input format is XML
    // if (inputFormat === "XML") {
    //   alert("目前仅支持 JSON 格式解析。");
    //   setLoading(false);
    //   return; // Exit the function
    // }

    const xmlData = `<Maths>
                          <Operation ID="Plus">
                              <Value>2</Value>
                              <Value>3</Value>
                              <Operation ID="Multiplication">
                                  <Value>4</Value>
                                  <Value>5</Value>
                              </Operation>
                          </Operation>
                    </Maths>`; // for test

    try {
      const dataToSend =
        inputFormat === "XML" ? xmlData : JSON.parse(inputData);
      console.info("XML data to send:", xmlData);
      console.log("Sending data:", dataToSend);
      console.log(
        "Content-Type:",
        inputFormat === "XML" ? "application/xml" : "application/json"
      );

      const response = await axios.post(api, dataToSend, {
        headers: {
          "Content-Type":
            inputFormat === "XML" ? "application/xml" : "application/json",
        },
      });

      console.info("Response data:", response.data);

      // Convert the result to a string or any format you want to render
      // Here I'm assuming the result is an object with a 'Result' property
      setResult(`Result: ${JSON.stringify(response.data)}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const errorMessage =
          axiosError.response.data ||
          `Error ${axiosError.response.status}: ${axiosError.response.statusText}`;

        console.error("Error - message:", errorMessage);
        console.error("Error - response data:", axiosError.response.data);
        setResult(
          `DematicPage.handleSubmit Error: ${JSON.stringify(
            axiosError.response.data
          )}`
        );
      } else if (axiosError.request) {
        console.error("Error: No response received", axiosError.request);
        setResult("Error: No response from server.");
      } else {
        console.error("Error:", axiosError.message);
        setResult("Error: Please check the input format and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 提交请求
  // const handleSubmit = async () => {
  //   const api = `${process.env.REACT_APP_API_URL}DematicCalculatorService`;   //process.env.REACT_APP_API_URL = http://localhost:5177/api/
  //   console.info("process.env.REACT_APP_API_URL api: ", api);
  //   setLoading(true); // 开始加载
  //   console.info("Input data:", inputData);
  //   try {
  //     // const response = await fetch(api, {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": inputFormat === "XML" ? "application/xml" : "application/json",
  //     //   },
  //     //   body: inputData,
  //     // });
  //     const response = await axios.post(api, inputData, {
  //       headers: {
  //         "Content-Type": inputFormat === "XML" ? "application/xml" : "application/json",
  //       },
  //     });

  //     console.info("response data:", response.data);
  //     setResult(response.data);

  //   } catch (error) {
  //     const axiosError = error as AxiosError; // 将 error 强制转换为 AxiosError
  //     if (axiosError.response) {
  //       // 请求已发出，服务器响应了状态码超出 2xx 的范围
  //       const errorMessage = axiosError.response.data || `Error ${axiosError.response.status}: ${axiosError.response.statusText}`;
  //       console.error("Error calculating:", errorMessage);
  //       setResult(`Error in calculation: ${errorMessage}`);
  //     } else if (axiosError.request) {
  //       // 请求已发出，但没有收到响应
  //       console.error("Error calculating: No response received", axiosError.request);
  //       setResult("Error in calculation: No response from server.");
  //     } else {
  //       // 发生错误时设置请求
  //       console.error("Error calculating:", axiosError.message);
  //       setResult("Error in calculation. Please check the input format and try again.");
  //     }
  //   } finally {
  //     setLoading(false); // 结束加载
  //   }
  // };

  // 切换格式时更新占位符内容
  const handleFormatChange = (format: "XML" | "JSON") => {
    setInputFormat(format);
    setInputData(
      format === "JSON"
        ? `{
          "Maths": {
            "Operation": {
              "@ID": "Plus",
              "Value": ["2","3"],
              "Operation": {
                "@ID": "Multiplication",
                "Value": ["4","5"]
              }
            }
          }
        }`
        : `<Maths>
                <Operation ID="Plus">
                    <Value>2</Value>
                    <Value>3</Value>
                    <Operation ID="Multiplication">
                        <Value>4</Value>
                        <Value>5</Value>
                    </Operation>
                </Operation>
            </Maths>`
    );
  };

  return (
    <div className="resume-container px-4 py-6 max-w-xl mx-auto">
      <ScrollToTop />
      <header className="resume-header text-center mb-8">
        <h1 className="text-3xl font-bold">{label}</h1>
        <h2 className="text-xl text-gray-600">Software Engineer</h2>
        <p className="mt-2 text-gray-500">Calculate Service - Support XML & JSON Formate</p>
      </header>

      {/* 格式选择和输入 */}
      <section className="resume-section mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Formate Selector：
          </label>
          <select
            value={inputFormat}
            onChange={(e) =>
              handleFormatChange(e.target.value as "XML" | "JSON")
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="XML">XML</option>
            <option value="JSON">JSON</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type the data：
          </label>
          <textarea
            ref={textareaRef}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md resize-none overflow-auto"
            placeholder={
              inputFormat === "XML" ? "<Maths>...</Maths>" : '{"Maths": {...}}'
            }
            style={{
              maxHeight: "calc(500 * 1.5em)", // 设置最大高度
            }}
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-md transition-colors`}
            disabled={loading} // 禁用按钮
          >
            {loading ? "Calculating..." : "Calculate"}{" "}
            {/* 根据加载状态改变按钮文本 */}
          </button>
        </div>
      </section>

      {/* 显示计算结果 */}
      {result && (
        <section className="resume-section mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Calc Result：</h3>
          <div className="p-4 border border-gray-300 rounded-md bg-gray-100 mt-2">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        </section>
      )}
    </div>
  );
};

export default DematicPage;
