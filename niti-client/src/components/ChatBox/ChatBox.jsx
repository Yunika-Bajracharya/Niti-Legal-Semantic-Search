import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SessionContext from "../../context/session";
import "./ChatBox.css";
import Lottie from "lottie-react";
import animationData from "../../assets/TypingIndicator.json";

const ChatBox = () => {
  const messageElement = useRef(null);
  const { messages } = useContext(SessionContext);

  const [showTypingAnimation, setShowTypingAnimation] = useState(false);

  // useEffect(() => {
  //   // Scroll to the bottom of the chat log when new messages arrive
  //   if (messageElement.current) {
  //     messageElement.current.scrollTop = messageElement.current.scrollHeight;
  //   }
  // }, [messages]);

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

  // const handleQuestionClick = (question) => {
  //   addMessage({ id: Date.now(), msg: `Human: ${question}` });
  // };

  // const questions = [
  //   "I got a ticket for breaking a traffic rule, but I didn't know about that rule. Can I say I didn't know and avoid the ticket?",
  //   "I married someone but I did not know they had Hepatitis-B. What can I do now?",
    
  //   "My neighbor throws solid waste and goods on the street. Isn’t there any law related to that so he could be punished?",
  //   "My older brother is using our ancestral property all by himself, and when I ask for my share, he shuts me saying he is the older one, so he gets the property. How do I ask for my rights to the property?",
  // ];

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
                    <p
                      dangerouslySetInnerHTML={{
                        __html: message.msg.slice(4),
                      }}
                    ></p>
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
