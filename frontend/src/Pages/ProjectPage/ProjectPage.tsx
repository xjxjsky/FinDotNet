import React, { useEffect } from "react";
import "./ProjectPage.css"; // 引入样式文件
import ScrollToTop from "../../Components/HelperComponents/ScrollToTop";

// 定义 Props 类型
type Props = {
  label: string;
  onClick: () => void;
};

// 创建一个函数组件并使用 Props 类型
const ResumePage: React.FC<Props> = ({ label, onClick }) => {

  return (
    <div className="resume-container">
      <ScrollToTop /> {/* 仅在加载此页面时滚动到顶部 */}
      <header className="resume-header">
        <h1>Jay XIE </h1>
        <section className="resume-section">
            <h3 className="">【Project Experience Page】</h3>
        </section>
        
        <p>
          Email: xjxjsky@gmail.com | Github -{" "}
          <a href="https://github.com/xjxjsky/FinDotNet" target="_blank" rel="noopener noreferrer">
            https://github.com/xjxjsky/FinDotNet
          </a>
        </p>
      </header>

      <section className="resume-section">
        <h3>Professional Summary & Skills</h3>
        <p className="highlighted-p">
          Motivated, disciplined and result driven | VISA: Permanent Resident
        </p>
      </section>

      <section className="resume-section">
        <h3>Skills List</h3>
        <ul>
          <li className="resume-li">
            10+ years’ experience in Telecommunications software architecture
            and development{" "}
          </li>
          <li className="resume-li">
            Strong experience with C#(10y+), VB.NET(3y+) Java(Java Swing TeleCom
            Projects 5y+), Transact-SQL, PL/SQL, RDBMS
          </li>
          <li className="resume-li">
            Solid experience with various DBs such as Microsoft SQL Server,
            Azure SQL Datebase, Oracle, MySQL (phpMyAdmin), etc.
          </li>
          <li className="resume-li">
            Experience on the Frontend like React, JavaScript, TypeScript, JSX,
            EXTJS, JQuery, Node.js, Inquirer.js, HTML + CSS
          </li>
          <li className="resume-li">
            Solid experience on the Backend such as .NET Framework, .NET, .NET
            Core, ASP.NET, Asp.net core web api, Web API (Get, PUT, POST,
            DELETE…), JSP, etc.
          </li>
          <li className="resume-li">
            Experience with Microsoft Azure, ORM like EF (Entity Framework
            Core), Git, GitHub actions, CI/CD pipeline process, XML, JSON, Web
            Service, RabbitMQ, JBoss, IIS, Tomcat, Solaris OS, Ubuntu
          </li>
          <li className="resume-li">Experience in IaaS, PaaS and SaaS.</li>
          <li className="resume-li">
            Very familiar with communication protocols such as China Mobile,
            China Unicom, CORBA (Common Object Request Broker Architecture)
            protocol, EMS, UDP, SMS, GPRS, Socket, TCP/IP, WebSocket etc.
          </li>
          <li className="resume-li">
            Knowledge of Azure Cloud, Network, Linux, RESTful services, AJAX,
            CMMI, etc.
          </li>
        </ul>
      </section>



      <section className="resume-section">
        <h3>Project Experience</h3>
        <h4>Portfolio Project： | 2024</h4>
        <p>
          To Design and develop an web application base on Repository Partern
          with React + ASP.NET core + Entity Framework(Azure SQL Database),
          Providing{" "}
        </p>
      </section>

      <section className="resume-section">
        <h3>Education</h3>
        <h4>Computer Science | H.U.S.T</h4>
      </section>

      <section className="resume-section">
        <h3>Licenses & Certifications </h3>
        <ul>
          <li className="resume-li">Software Programming and Data Modelling - TAFE NSW  ID: 105183732</li>
          <li className="resume-li">Microsoft Certified: Azure Data Fundamentals – Microsoft DP-900</li>
        </ul>
      </section>

      <section className="resume-section">
        <h3>Reference is available </h3>
        <ul>
          <li className="resume-li">Lelian Technologies: Mr Wu</li>
          <li className="resume-li">Mr. Guo</li>
          <li className="resume-li">Mr. Ji</li>
          <li className="resume-li">Teddy Xu & Raymond Xiang</li>
        </ul>
      </section>
    </div>
  );
};

export default ResumePage;
