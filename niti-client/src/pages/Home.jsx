import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { connection } from "../middleware/connection";
import SessionContext from "../context/session";
import logo from "../assets/large-logo.png";
import loader from "../assets/loader.svg";
import "./Home.css";

const Home = () => {
  const { setToken, name, setName, setSessionStart } = useContext(
    SessionContext
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(name);

  const handleInput = (event) => {
    setName(event.target.value);
  };

  const CREATE_SESSION = async () => {
    try {
      setLoading(true);
      const response = await connection.post(`/token?name=${name}`);
      const data = response.data ? response.data : undefined;
      console.log(data);
      const token = data.token ? data.token : undefined;
      const sessionStart = data.session_start;
      setToken(token);
      setName(data.name);
      setSessionStart(sessionStart);
      setLoading(false);
      navigate(`chat/${token}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name.length > 0) {
      CREATE_SESSION();
    } else {
      setError("Error! Provide Required Credentials");
    }
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "137px",
          }}
        >
          <div> Loading Session</div>
          <img src={loader} alt="UI loading" />
        </div>
      ) : (
        <>
          <img src={logo} alt="logo" className="home_logo"></img>
          <form onSubmit={onSubmit} className="home_form">
            <input
              placeholder="Enter your name"
              value={name}
              type="text"
              onChange={handleInput}
              className="home_textbox"
            ></input>
            <br></br>

            <button type="submit" className="home_submit">
              Start Chat
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Home;
