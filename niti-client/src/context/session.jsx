import React, { createContext, useState } from "react";

const SessionContext = createContext({});

export const SessionProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [session_start, setSessionStart] = useState("");
  const [socketState, setSocketState] = useState("");

  return (
    <SessionContext.Provider
      value={{
        token,
        setToken,
        messages,
        setMessages,
        name,
        setName,
        session_start,
        setSessionStart,
        socketState,
        setSocketState,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
