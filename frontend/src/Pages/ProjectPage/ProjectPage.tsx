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
        <h1>Jay XIE</h1>
        <section className="resume-section">
          <h3 className="">【Project Experience Page】</h3>
        </section>

        <p>
          Email: xjxjsky@gmail.com | Github -{" "}
          <a
            href="https://github.com/xjxjsky/FinDotNet"
            target="_blank"
            rel="noopener noreferrer"
          >
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
          {/* ... Skill list omitted for brevity */}
        </ul>
      </section>

      <section className="resume-section">
        <h3>Project Experience</h3>
        <h4>Portfolio Project： | 2024</h4>
        <p>
          To Design and develop a web application based on Repository Pattern
          with React + ASP.NET core + Entity Framework (Azure SQL Database),
          providing secure and scalable architecture.
        </p>
      </section>

      <section className="resume-section">
        <h3>Team & Collaboration Showcase</h3>
        <div className="team-photo-grid">
          <div className="team-photo-card">
            <img src="/pics/HP_Team.jpg" alt="Team Member 1" />
            <div className="photo-caption">
              <h4>HP Dev Team</h4>
              <p>Software Engineer</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          {/* Add more team member cards here */}
        </div>
      </section>
      <section className="resume-section">
        <h3>Qualification & Certification Showcase</h3>
        <div className="team-photo-grid">
          <div className="team-photo-card">
            <img src="/pics/microsoft-certified-azure-data-fundamentals.png" alt="Microsoft Azure Fundamental Cert" />
            <div className="photo-caption">
              <h4>MS Azure</h4>
              <p>Microsoft Azure Fundamental Cert</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/infosys reward.png" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Infosys HTDM Team Award</h4>
              <p>High-Tech Discrete Manufacturing Industry Department & Microsoft Dev Team</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          {/* Add more team member cards here */}
        </div>
      </section>

      <section className="resume-section">
        <h3>Dev Life & programmer dream Showcase</h3>
        <div className="team-photo-grid">
          <div className="team-photo-card">
            <img src="/pics/atGoogleCalif.jpg" alt="Microsoft Azure Fundamental Cert" />
            <div className="photo-caption">
              <h4>Mountain View, California U.S.</h4>
              <p>Google's headquarters in Mountain View</p>
              <p>Every programmer aspires to work at leading tech giants like Microsoft and Google.</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/infosys reward.png" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Infosys HTDM Team Award</h4>
              <p>High-Tech Discrete Manufacturing Industry Department & Microsoft Dev Team</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          <div className="team-photo-card">
            <img src="/pics/@HP(We're a dream team for being posted in HP office).jpg" alt="Team Member 2" />
            <div className="photo-caption">
              <h4>Dev Team Member 2</h4>
              <p>We're a dream team for being posted in HP office</p>
            </div>
          </div>
          {/* Add more team member cards here */}
        </div>
      </section>
      <section className="resume-section">
        <h3>Education</h3>
        <h4>Computer Science | Bachelor | H.U.S.T</h4>
      </section>

      <section className="resume-section">
        <h3>Licenses & Certifications</h3>
        <ul>
          <li className="resume-li">
            Software Programming and Data Modelling - TAFE NSW ID: 105183732
          </li>
          <li className="resume-li">
            Microsoft Certified: Azure Data Fundamentals – Microsoft DP-900
          </li>
        </ul>
      </section>

      <section className="resume-section">
        <h3>Reference is available</h3>
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
