import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SessionContext from "../../context/session";
import moment from "moment";
import "./ChatBox.css";
import Lottie from "lottie-react";
import animationData from "../../assets/TypingIndicator.json";

const ChatBox = () => {
  const messageElement = useRef(null);
  const { messages } = useContext(SessionContext);

  const [showTypingAnimation, setShowTypingAnimation] = useState(false);

  useEffect(() => {
    // Scroll to the bottom of the chat log when new messages arrive
    if (messageElement.current) {
      messageElement.current.scrollTop = messageElement.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    //To start animation immediately
    const latestHumanMessageIndex = messages.findIndex((message) =>
      message.msg.startsWith("Human:")
    );

    if (latestHumanMessageIndex !== -1) {
      setShowTypingAnimation(true);

      const timer = setTimeout(() => {
        setShowTypingAnimation(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  return (
    <div className="chat-log" ref={messageElement}>
      {messages.map((message, index) => {
        const isHuman = message.msg.startsWith("Human:");

        return (
          <div
            className={isHuman ? "chat-query" : "chat-answer"}
            key={message.id}
          >
            <div className="avatar">
              {isHuman ? (
                <img src={require("../../assets/user.png")} alt="user" />
              ) : (
                <img src={require("../../assets/logo.png")} alt="logo" />
              )}
            </div>
            <div className="message" id="p_wrap">
              {isHuman ? (
                <div>{message.msg.slice(6)}</div>
              ) : (
                <Fragment>
                  {showTypingAnimation && index === messages.length - 1 ? (
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        overflow: "hidden",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Lottie
                        animationData={animationData}
                        style={{ width: 200, height: 200 }}
                      />
                    </div>
                  ) : (
                    <div>{message.msg.slice(4)}</div>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
