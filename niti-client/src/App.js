import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom"; // Import BrowserRouter as Router

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import About from "./pages/About";
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <BrowserRouter>
    
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:token_id" element={<Chat />} />
          <Route path="/about/:token_id" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;