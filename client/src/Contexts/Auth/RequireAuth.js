

import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/UseApi";
import Home from "../../Routes/Home";
import { UserContext } from "./AuthContext";

export const RequireAuth = ({ children }) => {
  const api = useApi();
  const userLocal = useContext(UserContext)
  const [sessionValid, setSessionValid] = useState(false);
  const tokenLocalStorage = localStorage.getItem('userToken')
  console.log("renderizou Require");

  // useEffect(() => {
  //   async function validateSession() {
  //     const sessionApi = await api.IsLogged();
  //     setSessionValid(sessionApi === 200);
  //   }
  //   validateSession();
  // }, []); // utilizando a variavel para fazer o reload da função

  console.log(tokenLocalStorage)

  if (tokenLocalStorage) {
    toast.success("Bem-vindo");
    return children;
  } else {
    toast.warn("Session não encontrado");
    return <Home />;
  }
};
