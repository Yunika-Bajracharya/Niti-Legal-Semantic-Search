import React, {useState, useRef} from 'react';
import logo from "../assets/large-logo.png";
import "./About.css"
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar';

import Yunika from "../assets/members/Yunika.png"
import Pranab from "../assets/members/Pranab.jpg"
import Asmita from "../assets/members/Asmita.png"
import Sudip from "../assets/members/Sudip.jpg"
import Sawarni from "../assets/members/Sawarni.png"
import Shambhavi from "../assets/members/Shambhavi.png"
import Prerana from "../assets/members/Prerana.png"

const About = ({}) => {

  return (
    <div className='about-page' >
      <SideBar sidebar_status ={false}>
      <section className="heading">
        <h1 >About Us</h1>
      </section>
      <div className="container">
        
        <section className ="about">
          
          <div className ="about-content">
            <h2>Why Niti?</h2>
            <p>
              Legal professionals, such as lawyers and law students, 
              often dedicate significant time to searching for specific 
              answers in legal documents daily. Our solution, Niti, is 
              designed to simplify this process, enabling quick access 
              to legal information. This, in turn, allows professionals 
              more time for legal analysis, strategy development, and decision-making.
            </p>
            <p>
              Likewise, the legal system in Nepal can be complex and challenging 
              to navigate, particularly for individuals without a legal background.
               This will also be helpful for the general public to have easier access to legal information.
            </p>
            <h2>How it works?</h2>
            <p>
              Using Niti is easy—just type in your question. Niti quickly looks 
              through a huge collection of legal documents and provides the top 
              three most relevant answers. It also tells you which law the answer 
              comes from, so you can check and confirm if you want.
            </p>
            <p>
              Niti relies on semantic search at its core. Unlike traditional 
              keyword-based searches, our system grasps the context and meaning 
              behind legal questions. It goes beyond matching words and thinks 
              about how words relate to each other, making searches smarter and more precise.
            </p>
            <p>We have included the following legal documents:
              <ul>
                <li ><a href='https://lawcommission.gov.np/en/wp-content/uploads/2021/01/Constitution-of-Nepal.pdf'>Constitution of Nepal</a></li>
                <li><a href='https://www.moljpa.gov.np/en/wp-content/uploads/2018/12/Civil-code.pdf'>The National Civil (Code) Act, 2017 (2074)</a></li>
                <li><a href='https://www.moljpa.gov.np/en/wp-content/uploads/2018/12/Civil-procedure-code.pdf'>The National Civil Procedure (Code) Act, 2017</a></li>
              </ul>
            </p>
          </div>
          <div className ="about-image">
            <img src={logo} alt="logo"></img>
          </div>
        </section>
      </div>

      <h2 className='team'>The Team</h2>
      <div className="section team-container">
        <div className="team-box">
          <img src={Yunika} alt="Yunika" className="team-member-image" />
          <h3>Yunika Bajracharya</h3>
          <p>Developer</p>
          <div className="icon-container">
            {/* <FontAwesomeIcon icon="fa-brands fa-linkedin" style={{color: "#205072",}} /> */}
            <a href="https://www.linkedin.com/in/yunikabajracharya/" className="icon-link">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href= "mailto:bajracharya.yunika@gmail.com" className="icon-link">
              <i className ="fa-solid fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div className="team-box">
          <img src={Pranab} alt="Pranab" class="team-member-image" />
          <h3>Pranab Gubhaju</h3>
          <p>Developer</p>
          <div className="icon-container">
            <a href="https://www.linkedin.com/in/pranab-ratna-gubhaju/" className="icon-link">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href= "mailto:pranabgubhaju@gmail.com" className="icon-link">
              <i className ="fa-solid fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        
        <div className="team-box">
          <img src={Asmita} alt="Asmita" class="team-member-image" />
          <h3>Asmita Sigdel</h3>
          <p>Developer</p>
          <div className="icon-container">
            <a href="https://www.linkedin.com/in/asmita-sigdel-928788215/" className="icon-link">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href= "mailto:077bei013.asmita@pcampus.edu.np" className="icon-link">
              <i className ="fa-solid fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div className="team-box">
          <img src={Sudip} alt="Sudip" class="team-member-image" />
          <h3>Sudip Tiwari</h3>
          <p>Developer</p>
          <div className="icon-container">
            <a href="https://www.linkedin.com/in/sudiptiwari/" className="icon-link">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href= "mailto:077bct085.sudip@pcampus.edu.np" className="icon-link">
              <i className ="fa-solid fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        
        <div className="team-box">
          <img src={Sawarni} alt="Sawarni" class="team-member-image" />
          <h3>Sawarni Ghimire</h3>
          <p>Team Member</p>
          <div className="icon-container">
            <a href="https://www.linkedin.com/in/sawarni-ghimire-8b5b9a70/" className="icon-link">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href= "mailto:sawarnighimire@gmail.com" className="icon-link">
              <i className ="fa-solid fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        
        <div className="team-box">
          <img src={Shambhavi} alt="Shambhavi" class="team-member-image" />
          <h3>Shambhavi Adhikari</h3>
          <p>Team Member</p>
          <div className="icon-container">
            <a href="https://www.linkedin.com/in/shambhavi-adhikari-322a471b2/" className="icon-link">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href= "mailto:shambhaviadhikari@yahoo.com" className="icon-link">
              <i className ="fa-solid fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        
        <div className="team-box">
          <img src={Prerana} alt="Prerana" class="team-member-image" />
          <h3>Prerana Sapkota</h3>
          <p>Team Member</p>
          <div className="icon-container">
            <a href="https://www.linkedin.com/in/prerana-sapkota-03b786205/" className="icon-link">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href= "mailto:sapkotaprerana@gmail.com" className="icon-link">
              <i className ="fa-solid fa-envelope" aria-hidden="true"></i>
            </a>
          </div>
        </div>
             
      </div>

      <footer className="footer">
        <div className="copyright">
          &copy; 2023 Niti - Team LawYaar
        </div>
      </footer>
      </SideBar>
     
    </div>

  );
};
export default About;



