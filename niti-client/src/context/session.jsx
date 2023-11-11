import React, { createContext, useState } from "react";

const SessionContext = createContext({});

export const SessionProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [session_start, setSessionStart] = useState("");
  const [socketState, setSocketState] = useState("");
  const [isBotProcessing, setIsBotProcessing] = useState(false);

  React.useEffect(() => {
    setIsBotProcessing(socketState === "processing");
  }, [socketState]);

  const contextValue = {
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
    isBotProcessing,
    setIsBotProcessing,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
