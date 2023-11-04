import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom"; // Import BrowserRouter as Router

import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:token_id" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;