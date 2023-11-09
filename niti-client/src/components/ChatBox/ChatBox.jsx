import React, { Fragment, useContext, useEffect, useRef } from "react";
import SessionContext from "../../context/session";
import moment from "moment";
import "./ChatBox.css";
const ChatBox = () => {
  const messageElement = useRef(null);
  const { messages, socketState } = useContext(SessionContext);

  useEffect(() => {
    // Scroll to the bottom of the chat log when new messages arrive
    if (messageElement.current) {
      messageElement.current.scrollTop = messageElement.current.scrollHeight;
    }
  }, [messages]);

  console.log(messages);

  return (
    <div className="chat-log" ref={messageElement}>
      {messages.map((message, index) => {
        const isHuman = message.msg.substring(0, 5) === "Human";

        return (
          <div
            className={isHuman ? "chat-query" : "chat-answer"}
            key={message.id}
          >
            {isHuman ? (
              <div className="avatar">
                <img src={require("../../assets/user.png")} alt="user" />
              </div>
            ) : (
              <div className="avatar">
                <img src={require("../../assets/logo.png")} alt="logo" />
              </div>
            )}
            {isHuman ? (
              <div className="message">{message.msg.slice(6)}</div>
            ) : (
              <div className="message" id="p_wrap">
                {message.msg}
              </div>
            )}
            {/* <div>{moment(message.timestamp, "YYYYMMDD").fromNow()}</div> */}
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
