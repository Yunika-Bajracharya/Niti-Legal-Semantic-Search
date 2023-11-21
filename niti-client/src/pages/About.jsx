import React, {useState, useRef} from 'react';
import logo from "../assets/large-logo.png";
import "./About.css"
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const About = ({isSpecialPage}) => {
  const pageClass = isSpecialPage ? 'unique-page-class-special':'unique-page-class';
  const { token_id } = useParams();
  

  return (
    <div className={pageClass} >
      <section className="heading">
      <Link to="/" className="arrow-link">
        <div className="arrow-box">
        <div className="arrow">&#8592;</div>
        {/* <span>Go Back</span> */}
        </div>
      </Link>
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
          <h3>Yunika Bajracharya</h3>
          <p>Developer</p>
        </div>

        <div className="team-box">
          <h3>Pranab Ratna Gubhaju</h3>
          <p>Developer</p>
        </div>
        
        <div className="team-box">
          <h3>Asmita Sigdel</h3>
          <p>Developer</p>
        </div>

        <div className="team-box">
          <h3>Sudip Tiwari</h3>
          <p>Developer</p>
        </div>

        
        <div className="team-box">
          <h3>Sawarni Ghimire</h3>
          <p>Team Member</p>
        </div>
        
        <div className="team-box">
          <h3>Shambhavi Adhikari</h3>
          <p>Team Member</p>
        </div>
        
        <div className="team-box">
          <h3>Prerana Sapkota</h3>
          <p>Team Member</p>
        </div>
             
      </div>
       

      <footer className="footer">
        <div className="copyright">
          &copy; 2023 Niti - Team LawYaar
        </div>
      </footer>
    </div>
  );
};
export default About;



