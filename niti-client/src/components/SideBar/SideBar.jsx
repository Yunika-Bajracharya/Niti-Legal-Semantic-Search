import React, { useState, useEffect, useContext } from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SessionContext from "../../context/session";
import { FaSignOutAlt, FaUsers, FaBars, FaPenSquare } from "react-icons/fa";

const SideBar = ({ children, sidebar_status }) => {
  const [isOpen, setIsOpen] = useState(sidebar_status);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { token }  = useContext(SessionContext);
  // const sidebarWidth = isClosed ? 75 : isOpen ? 210 : 75;
  console.log(isOpen)

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNewChatClick = () => {
    try {
      navigate(`/chat/${token}`);
    } catch (error) {
      console.error("Error navigating to new chat: ", error);
    }
  };

  const menuItem = [
    {
      path: token ? `/chat/${token}` : "/",
      name: "Chat",
      icon: <FaPenSquare />,
      onClick: handleNewChatClick,
    },
    {
      path: `/about`,
      name: "About Us",
      icon: <FaUsers />,
    },
    {
      path: "/",
      name: "Log Out",
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <div className="sidebar-container">
      <main style={{ marginLeft: isOpen ? "210px" : "50px"}} className="sidebar-content">{children}</main>
      <div style={{ width: isOpen ? "210px" : "75px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="sidebar-logo">
            Niti
          </h1>
          <div style={{ marginLeft: isOpen ? "75px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link" activeClassName="active" onClick={item.onClick}>
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link-text">
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      
    </div>
  );
};

export default SideBar;
