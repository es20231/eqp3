


import { toast } from "react-toastify";

import Home from "../../Routes/Home";


export const RequireAuth = ({ children }) => {

  const tokenLocalStorage = localStorage.getItem('userToken')
  


  if (tokenLocalStorage) {
    // toast.success("Bem-vindo");
    return children;
  } else {
    toast.warn("Session não encontrado");
    return <Home />;
  }
};
