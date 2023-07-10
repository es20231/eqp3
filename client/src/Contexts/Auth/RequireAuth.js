import { UserContext } from "./AuthContext";
import { useContext, useEffect } from "react";
import Alerta from "../../Routes/Teste";

import { toast } from "react-toastify";

export const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);



  // Redireciona para a página Alerta se o token não for encontrado
  console.log("renderizou Require ")
  // vou utilizar a variavel local por conta do delay de passagem de parâmetro
  if (localStorage.getItem("userToken")) { //user.token 
    toast.success("Bem-vindo");
    return children;
  } else {
    
    toast.warn("Token não encontrado");
    return <Alerta />;
  }
};