// Importar React e createContext
import React, { createContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/UseApi";
import Alert from 'react-bootstrap/Alert';

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Criar um contexto para armazenar o perfil do usuário
const UserContext = createContext();


// Criar um componente provedor do contexto
const UserProvider = ({ children }) => {
  // Criar um estado para armazenar o perfil do usuário
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    token: ''
  });

  const api = useApi();
  const navigate = useNavigate();

 


  //função de verificação de token do localStorage 
  useEffect(() => {
    const verificarToken = () => {
      const tokenLocalStorage = localStorage.getItem('userToken')
      if (tokenLocalStorage) {
        //verifica se o token eh valido 
        // toast.success("possui um token")
        setUser({
          ...user,
          // email: localStorage.getItem('userEmail'),
          // name: localStorage.getItem('userName'),
          token: localStorage.getItem('userToken')
        });
        console.log(user.token)
        navigate('/Private');
        
      } else {
        // toast.warning("sem token no localStorage")
      }

    }
    verificarToken();
  }, [])

  // async function apiVerificaToken() {
  //   const validateApiToken = await api.ValidateToken(user.email, user.token);
  //   //retorna um boolean
  //   return validateApiToken.data;

  // }

  // Vou mandar email e senha e vou receber Usuario email token 
  const login = async (userName, password) => {
    try {
      const dataApi = await api.login(userName, password); // REsposta do Back com token
        setUser({ email: dataApi.email, name: dataApi.name, token: dataApi.token }); // Setting the user object
        // toast.success("dados recebidos");
        localStorage.setItem("userToken", dataApi.data.token); // Storing the user token in the localStorage
        return true;
      }
      // throw new Error("Invalid credentials");
     catch (error) {
      toast.error(error.message);
      return false;
    }
  };
  
  

  // Criar uma função para fazer logout do usuário
  const logout = async () => {
    try {
      await api.logout();
      setUser(null); // Clearing the user
      localStorage.removeItem("userToken"); // Clearing the localStorage
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Retornar o componente provedor com o valor do contexto
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Exportar o contexto e o provedor
export { UserContext, UserProvider };
