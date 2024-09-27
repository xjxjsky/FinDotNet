import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { searchCompanies } from './api';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log(searchCompanies("AA"));
const apiKey = process.env.REACT_APP_API_KEY;
console.log("API Key:", apiKey); // 检查是否能正确打印出API Key

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
