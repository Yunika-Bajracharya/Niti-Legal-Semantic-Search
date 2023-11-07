import React, { useContext, useState, useEffect, useRef } from "react";
import SessionContext from "../../context/session";
import { v4 as uuid4 } from "uuid";
import "./ChatInput.css";

const ChatInput = (props) => {
  const [chatInput, setChatInput] = useState("");
  const { messages, setMessages, token, setSocketState } = useContext(
    SessionContext
  );
  const [isPaused, setPause] = useState(false);

  const handleChange = (event) => {
    setChatInput(event.target.value);
  };

  const ws = useRef();

  useEffect(() => {
    if (null !== ws) {
      ws.current = new WebSocket(`ws://localhost:3500/chat?token=${token}`);
      ws.current.onopen = () => setSocketState("active");
      ws.current.onclose = () => setSocketState("");

      return () => {
        ws.current.close();
      };
    }
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (event) => {
      if (isPaused) return;
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
  }, [isPaused]);

  const updateMessages = async (event) => {
    event.preventDefault();
    setPause(!isPaused);
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
      ws.current.send(chatInput);
      setChatInput("");
    }
  };

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
          required="required"
        ></input>
        <input type="submit" value="&#xf1d8;" />
      </form>
    </div>
  );
};

export default ChatInput;
