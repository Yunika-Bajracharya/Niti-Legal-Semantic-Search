// Problem with sidebar

import React, {useState,useContext,useEffect, useCallback} from 'react'
import SessionContext from '../context/session'
import { connection } from '../middleware/connection'
import { useParams } from 'react-router-dom'
import ChatInput from '../components/ChatInput/ChatInput'
import ChatBox from '../components/ChatBox/ChatBox'
import "./Chat.css"
import "normalize.css"
import { Link } from 'react-router-dom';
import { FaBars} from 'react-icons/fa';

const Chat = () => {
    const {
      setToken,
      session_start,
      setName,
      name,
      setSessionStart,
      setMessages,
    } = useContext(SessionContext);
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState("");
    const [chat, setChat] = useState({
      id: "",
      msg: "",
      timestamp: "",
    });
    const { token_id } = useParams();
    const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 450);
  
    
    useEffect(() => {
      const REFRESH_SESSION = async () => {
        setLoading(true);
        try {
          const response = await connection.get(`/refresh_token?token=${token_id}`);
          const data = response.data? response.data : undefined; 
          console.log(data)
          const token = data.token ? data.token : undefined; 
          const sessionStart = data.session_start;
          setToken(token);
          setName(data.name); 
          setSessionStart(sessionStart);
          setMessages(data.messages)
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError("An unknown error has occured, Please try again later");
        }
      };
  
      REFRESH_SESSION();
    }, [token_id]);

    const toggleSidebar = () => {
      setSidebarVisible((prevSidebarVisible) => !prevSidebarVisible);
    };


  return (
    <div className="Chat"> 
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <aside className={`sidebar ${sidebarVisible ? '' : 'hidden'}`}>
        
        <h1 className="logo">Niti</h1>
        <div>
          Welcome, {name}
        </div>
        <Link to="/about" className="about-us">
          <div className="about-us-button">
            <p>About us</p>
          </div>
        </Link>
      </aside>

      <section className="chatbox">
        <ChatBox/>
        <ChatInput chat={chat} setChat={setChat}/>
      </section>
    </div>
  );
};


export default Chat


