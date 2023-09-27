import React from "react";
import "./normalize.css";
import "./App.css";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    // {
    //   user: "me",
    //   message: "Can you tell me more?",
    // },
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    setChatLog([...chatLog, { user: "me", message: `${input}` }]);
    setInput("");
  }

  return (
    <div className="App">
      <aside className="sidebar">
        <h1 className="logo">Niti</h1>
        <div className="sidebar-button">
          <span>+</span>
          New chat
        </div>
      </aside>

      <section className="chatbox">
        <div className="chat-log">
          <div className="chat-query">
            <div className="avatar">
              <img src={require("./assets/user.png")} alt="logo" />
            </div>
            <div className="message">
              Can I get citizenship through my mother?
            </div>
          </div>

          <div className="chat-answer">
            <div className="avatar">
              <img src={require("./assets/logo.png")} alt="logo" />
            </div>
            <div className="message">
              Under Acquisition of Nepali Citizenship by descent: <br />
              <br />
              Any person born at the time when his father or mother is a citizen
              of Nepal, shall be a citizen of Nepal by descent.
              <br />
              <br />
              <button className="source">
                Source:{" "}
                <a
                  href="https://jp.nepalembassy.gov.np/wp-content/uploads/2017/11/citizenship_act_eng.pdf"
                  target="_blank"
                >
                  Nepal Citizenship Act 2063(2006)
                </a>
              </button>
            </div>
          </div>

          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <div className="chat-inputbox">
          <form onSubmit={handleSubmit} className="form-inputbox">
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-textarea"
              type="text"
              placeholder="Type your queries here"
              required="required"
            ></input>
            <input type="submit" class="search" value="&#xf1d8;" />
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className="chat-query">
      <div className="avatar">
        <img src={require("./assets/user.png")} alt="logo" />
      </div>
      <div className="message">{message.message}</div>
    </div>
  );
};
export default App;
