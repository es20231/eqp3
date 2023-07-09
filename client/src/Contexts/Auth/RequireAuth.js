import { UserContext } from "./AuthContext";
import { useContext, useEffect } from "react";
import Alerta from "../../Routes/Teste";

import { toast } from "react-toastify";

export const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   if (!user.token) {
  //     toast.warn("Token não encontrado");
  //   } else {
  //     toast.success("Bem-vindo");
  //   }
  // }, [user.token]);

  // Redireciona para a página Alerta se o token não for encontrado
  console.log("renderizou Require ")
  if (!user.token) {

    toast.warn("Token não encontrado");
    return <Alerta />;
  } else {
    // toast.success("Bem-vindo");
    return children;
  }

  
  
};