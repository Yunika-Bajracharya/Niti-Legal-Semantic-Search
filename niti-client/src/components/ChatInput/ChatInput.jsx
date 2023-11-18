import React, { useContext, useState, useEffect, useRef } from "react";
import SessionContext from "../../context/session";
import { v4 as uuid4 } from "uuid";
import "./ChatInput.css";

const ChatInput = (props) => {
  const [chatInput, setChatInput] = useState("");
  const { messages, setMessages, token, socketState,setSocketState } = useContext(
    SessionContext
  );

  const handleChange = (event) => {
    setChatInput(event.target.value);
  };

  const ws = useRef();

  useEffect(() => {
    if (null !== ws) {
      ws.current = new WebSocket(`ws://localhost:3500/chat?token=${token}`);
      ws.current.onopen = () => setSocketState("active");
      ws.current.onclose = () => setSocketState("");

      const wsCurrent = ws.current;
      return () => {
        wsCurrent.close();
      };
    }
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = async (event) => {
      try {
        const validJsonString = event.data.replace(/'/g, '"');
        const message = JSON.parse(validJsonString);
        setMessages(messages.concat(message));
        console.log(messages);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        console.log(event.data);
      }
    };
  }, [messages]);

  const updateMessages = async (event) => {
    event.preventDefault();
    if (chatInput.length > 0) {
      const chat = {
        id: uuid4(),
        msg: `Human: ${chatInput}`,
        timestamp: new Date().toLocaleString(),
      };
      console.log(chat);
      setMessages(messages.concat(chat));
      // console.log(ws.current)
      // console.log(chatInput)
      await ws.current.send(chatInput);
      setChatInput("");
    }
  };

    // console.log(socketState)

  return (
    <div className="chat-inputbox">
      <form onSubmit={updateMessages} className="form-inputbox">
        <input
          rows="1"
          value={chatInput}
          onChange={handleChange}
          className="input-textarea"
          type="text"
          placeholder="Type your queries here"
          disabled={socketState == "active"?false:true}
          required="required"
        ></input>
        <input type="submit" value="&#xf1d8;" />
      </form>
    </div>
  );
};

export default ChatInput;
