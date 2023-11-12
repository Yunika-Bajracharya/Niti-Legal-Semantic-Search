import React,{useState,useContext,useEffect} from 'react'
import SessionContext from '../context/session'
import { connection } from '../middleware/connection'
import loader from "../assets/loader.svg"
import { useParams } from 'react-router-dom'
import ChatInput from '../components/ChatInput/ChatInput'
import ChatBox from '../components/ChatBox/ChatBox'
import "./Chat.css"
import "normalize.css"


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


  return (
    <div className="Chat">
      <aside className="sidebar">
        <h1 className="logo">Niti</h1>
        <div>
          Welcome, {name}
        </div>
      </aside>

      <section className="chatbox">
        <ChatBox/>

        <ChatInput chat={chat} setChat={setChat}/>
      </section>
    </div>
  );
};


export default Chat


