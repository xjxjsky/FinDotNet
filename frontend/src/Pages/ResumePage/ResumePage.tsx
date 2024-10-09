import React, { useEffect } from "react";
import "./ResumePage.css"; // 引入样式文件
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
        <h1>Jay XIE</h1>
        <h2>Software Engineer</h2>
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
        <h3>- Relocation</h3>
        <h4>Relocate with family | Mar 2023 - Present</h4>
        <p>
          Building my project FinDotNet with React Frontend(Node.js v20) +
          Asp.net core web api + Microsoft Azure SQL Database (In development
          with MS SQL Express in local) that has been running on my Azure Cloud
          Service, using Ubantu Linux to manage my backend web api codes and
          Node.js 20 with the Frontend codes. More details, welcome to have my
          personal web site or github:
          https://witty-moss-0dca53900.5.azurestaticapps.net/
          https://github.com/xjxjsky/FinDotNet
        </p>
        <br />

        <h3>- System Engineer | Lelian Technology | Mar 2012 - Mar 2023</h3>
        <p>Responsibilities:</p>
        <ul>
          <li className="resume-li">
            Strictly adhered to the Operator protocol while developing the OMC
            management system using the .Net technology stack.
          </li>
          <li className="resume-li">
            Participated in and contributed to the high-level and detailed
            design of the telecommunications system software.
          </li>
          <li className="resume-li">
            Formulated development proposals based on customer requirements.
          </li>
          <li className="resume-li">
            Actively engaged with customers to clearly understand and document
            their needs.
          </li>
          <li className="resume-li">
            Conducted code reviews & quality assessments to ensure adherence to
            standards.
          </li>
          <li className="resume-li">
            Provided on-premises problem resolution.
          </li>
        </ul>
        <p>Achievements:</p>
        <ul>
          <li className="resume-li">
            Assisted the manager in significantly optimizing the development
            process by implementing automated testing and continuous
            integration, reducing development time by 30%.
          </li>
          <li className="resume-li">
            Built strong relationships with customers through regular feedback
            sessions and proactive communication, fostering trust and
            collaboration.
          </li>
          <li className="resume-li">
            Ensured the timely delivery of the application system on-site by
            effectively managing project timelines and coordinating with
            cross-functional teams.
          </li>
          <li className="resume-li">
            Successfully resolved on-premises issues by implementing robust
            troubleshooting protocols, maintaining system reliability and
            minimising downtime.
          </li>
          <li className="resume-li">
            Oversaw team members, providing mentorship and guidance that
            significantly improved product quality and boosted team productivity
            by 25%.
          </li>
        </ul>
        <br />

        <h3>
          - Senior Software Engineer | Rosenberger Asia Pacific | Dec 2010 - Mar
          2012
        </h3>
        <p>Responsibilities:</p>
        <ul>
          <li className="resume-li">
            Design and Development: In compliance with the China Mobile
            Protocol, architected, designed, and developed the Operation
            Maintenance Center using a robust ExtJS + Spring + Hibernate
            framework.
          </li>
          <li className="resume-li">
            Conducted code reviews & quality assessments.
          </li>
          <li className="resume-li">
            Mentorship: Acted as a mentor, providing training and guidance to
            new team members, enhancing their understanding and proficiency in
            our tech stack.
          </li>
          <li className="resume-li">
            Team Management Support: Assisted the Project Manager in overseeing
            the development team, contributing to efficient team management and
            project execution.
          </li>
        </ul>
        <p>Achievements:</p>
        <ul>
          <li className="resume-li">
            Implemented innovative solutions that enhanced the Operation
            Maintenance Centre's system performance and user experience.
          </li>
          <li className="resume-li">
            Played a key role in the timely delivery of high-quality software
            solutions, meeting all project deadlines and client expectations.
          </li>
          <li className="resume-li">
            Independently developed a workflow system to manage assembly line
            production using ASP.NET three-layer architecture.
          </li>
        </ul>
        <br />

        <h3>- Software Engineer | ZTE Corporation | Sep 2008 - Dec 2010</h3>
        <p>Responsibilities:</p>
        <ul>
          <li className="resume-li">
            Developed and unit-tested the alarm module of the Unified EMS
            system.
          </li>
          <li className="resume-li">
            Assisted our team leader with code reviews and defect process (DP).
          </li>
          <li className="resume-li">
            Recruited new members and provided training to integrate them into
            the development team.
          </li>
        </ul>
        <p>Achievements:</p>
        <ul>
          <li className="resume-li">
            Independently developed and maintained UAAT (Unified Alarm Analysis
            Tool) using Java Swing, a critical Minos (OMC) component.
          </li>
          <li className="resume-li">
            Independently developed and maintained the Alarm Module of the EMS
            system using Java.
          </li>
          <li className="resume-li">Awarded Most Valued Staff of 2008~2009.</li>
        </ul>
        <p>Development Tech:</p>
        <p>
          Java, Java Swing, JMS, EJB, JBoss, Solaris Server, Oracle 9i, PL/SQL,
          Stored Procedure, design patterns and more. The EMS system (Unified
          Platform Network Management System, previously called Minos) was
          developed and maintained by a team of over 1000 developers. It
          comprised modules such as TOPO, Alarm, Performance, and Configuration
          Management, built on the MUEP and UEP platforms using Java. Today, EMS
          has evolved into a large cloud-based system that supports multiple
          APIs for web access, allowing users to access the EMS via mobile
          phones, laptops, tablet PCs or other terminals as long as the
          protocols are allowed.
        </p>
        <br />
        <h3>
          - Software Engineer | Infosys Technologies | May 2006 - Aug 2008
        </h3>
        <p>
          One year worked @Hewlett-Packard Company's GADSC (Global Application
          Development Software Center) OPTIMUM Team.
        </p>
        <p>Responsibilities:</p>
        <ul>
          <li className="resume-li">
            Worked as a software engineer on the OPTIMUM (MSPricing) pricing
            application from scratch since 2007.
          </li>
          <li className="resume-li">
            Developed and maintained several applications based on ASP.NET, Web
            Service & Windows Forms.
          </li>
          <li className="resume-li">
            Delivered software products from the test server to the product
            server on-premises.
          </li>
        </ul>
        <p>Achievements:</p>
        <ul>
          <li className="resume-li">
            Independently completed customer requirements and tested them before
            deployment.
          </li>
          <li className="resume-li">
            Assisted the project manager with team management, training,
            documentation, team-building activities etc.
          </li>
          <li className="resume-li">
            Awarded the Best OEE Initiative Certificate of Achievement in
            recognition of outstanding performance, granted by Infosys
            headquarters due to hard work.
          </li>
          <li className="resume-li">
            Successfully completing the validation module of the OPTIMUM system,
            a crucial part of the entire project.
          </li>
        </ul>
        <p>Development Tech:</p>
        <p>
          {" "}
          .NET WinForm, C#, MS SQL Server, Web Service, VBA, Stored Procedure.
          OPTIMUM is a financial system used by Opportunity Consultants within
          the HP Enterprise services (ES) business to evaluate the potential new
          business by providing a standardized set of financial indicators.
          Currently, OPTIMUM is being used by the ES finance team to price
          approximately 75% of deals (in total contract value) for ES, amounting
          to $15 billion annually.
        </p>
        <br />

        <h3>- Programmer | Wicresoft | Sep 2005 - May 2006</h3>
        <p>Responsibilities:</p>
        <p>
          Developed and Tested Microsoft-related products as a .NET programmer
          and tester. Wicresoft is an integrated IT service provider offering
          end-to-end, one-stop digital services for global customers, which was
          founded in 2002 as Microsoft’s first joint venture company in China.
        </p>
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
