import React from 'react';
import './ResumePage.css'; // 引入样式文件

// 定义 Props 类型
type Props = {
    label: string;
    onClick: () => void;
};

// 创建一个函数组件并使用 Props 类型
const ResumePage: React.FC<Props> = ({ label, onClick }) => {
    return (
        <div className="resume-container">
          <header className="resume-header">
            <h1>张三</h1>
            <h2>软件工程师</h2>
            <p>Email: zhangsan@example.com | 电话: 123-456-7890 | LinkedIn: linkedin.com/in/zhangsan</p>
          </header>
    
          <section className="resume-section">
            <h3>职业目标</h3>
            <p>致力于成为一名出色的软件工程师，专注于开发高效、可扩展的应用程序。</p>
          </section>
    
          <section className="resume-section">
            <h3>技能</h3>
            <ul>
              <li>JavaScript (React, Node.js)</li>
              <li>C# (.NET, ASP.NET Core)</li>
              <li>数据库 (SQL Server, MongoDB)</li>
              <li>云计算 (Azure, AWS)</li>
              <li>版本控制 (Git)</li>

              <li>JavaScript (React, Node.js)</li>
              <li>C# (.NET, ASP.NET Core)</li>
              <li>数据库 (SQL Server, MongoDB)</li>
              <li>云计算 (Azure, AWS)</li>
              <li>版本控制 (Git)</li>
              <li>JavaScript (React, Node.js)</li>
              <li>C# (.NET, ASP.NET Core)</li>
              <li>数据库 (SQL Server, MongoDB)</li>
              <li>云计算 (Azure, AWS)</li>
              <li>版本控制 (Git)</li>
              <li>JavaScript (React, Node.js)</li>
              <li>C# (.NET, ASP.NET Core)</li>
              <li>数据库 (SQL Server, MongoDB)</li>
              <li>云计算 (Azure, AWS)</li>
              <li>版本控制 (Git)</li>
              <li>JavaScript (React, Node.js)</li>
              <li>C# (.NET, ASP.NET Core)</li>
              <li>数据库 (SQL Server, MongoDB)</li>
              <li>云计算 (Azure, AWS)</li>
              <li>版本控制 (Git)</li>
              <li>JavaScript (React, Node.js)</li>
              <li>C# (.NET, ASP.NET Core)</li>
              <li>数据库 (SQL Server, MongoDB)</li>
              <li>云计算 (Azure, AWS)</li>
              <li>版本控制 (Git)</li>
              <li>JavaScript (React, Node.js)</li>
              <li>C# (.NET, ASP.NET Core)</li>
              <li>数据库 (SQL Server, MongoDB)</li>
              <li>云计算 (Azure, AWS)</li>
              <li>版本控制 (Git)</li>
            </ul>
          </section>
    
          <section className="resume-section">
            <h3>工作经历</h3>
            <h4>高级软件工程师 | ABC科技公司 | 2020年1月 - 至今</h4>
            <p>负责设计和开发企业级应用，优化系统性能，提高用户体验。</p>
    
            <h4>软件工程师 | XYZ公司 | 2018年6月 - 2019年12月</h4>
            <p>参与前端和后端开发，使用React和Node.js构建高效的Web应用。</p>
          </section>
    
          <section className="resume-section">
            <h3>教育背景</h3>
            <h4>计算机科学学士 | 某大学 | 2014年9月 - 2018年6月</h4>
          </section>
    
          <section className="resume-section">
            <h3>项目经历</h3>
            <h4>个人项目：在线书店 | 2022年</h4>
            <p>设计并开发一个在线书店应用，使用React和MongoDB，提供用户友好的购物体验。</p>
          </section>
    
          <section className="resume-section">
            <h3>推荐信</h3>
            <p>“张三是一位极具潜力的软件工程师，他的工作态度和技术能力让团队受益匪浅。” - 前经理</p>
          </section>
        </div>
      );
};


export default ResumePage;