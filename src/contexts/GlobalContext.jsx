import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const globalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [articlesArray, setArticlesArray] = useState();
  const [isVisiblePost, setIsVisiblePost] = useState(false);
  const [getMyArticle, setGetMyArticle] = useState(false);
  const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
  const [isVisibleDelete, setIsVisibleDelete] = useState(false);
  const [isRefresh, setIsRefresh] = useState(true);

  const navigate = useNavigate();

  return (
    <globalContext.Provider
      value={{
        // navigate,
        isConnected,
        setIsConnected,
        navigate,
        email,
        setEmail,
        password,
        setPassword,
        articlesArray,
        setArticlesArray,
        isVisiblePost,
        setIsVisiblePost,
        getMyArticle,
        setGetMyArticle,
        isVisibleUpdate,
        setIsVisibleUpdate,
        isVisibleDelete,
        setIsVisibleDelete,
        isRefresh,
        setIsRefresh,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default globalContext;
