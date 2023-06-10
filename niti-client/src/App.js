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
        <div className="chat-inputbox">
          <textarea
            rows="1"
            className="chat-input-textarea"
            placeholder="Type your queries here"
          ></textarea>
        </div>
      </section>
    </div>
  );
}

export default App;
