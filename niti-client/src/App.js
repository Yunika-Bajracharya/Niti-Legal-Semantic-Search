import React from "react";
import "./normalize.css";
import "./App.css";

function App() {
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
              Is it legal to marry one's favorite fictional character?
            </div>
          </div>

          <div className="chat-answer">
            <div className="avatar">
              <img src={require("./assets/logo.png")} alt="logo" />
            </div>
            <div className="message">
              Unfortunately, the legal system isn't ready for inter-dimentional
              love affairs just yet.
            </div>
          </div>
        </div>

        <div className="chat-inputbox">
          <textarea
            rows="1"
            className="input-textarea"
            type="text"
            placeholder="Type your queries here"
          ></textarea>
        </div>
      </section>
    </div>
  );
}

export default App;
