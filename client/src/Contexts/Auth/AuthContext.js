// Importar React e createContext
import React, { createContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/UseApi";
import Alert from 'react-bootstrap/Alert';

import { toast } from "react-toastify";

// Criar um contexto para armazenar o perfil do usuário
const UserContext = createContext();

// Criar um componente provedor do contexto
const UserProvider = ({ children }) => {
  // Criar um estado para armazenar o perfil do usuário
  const [user, setUser] = useState({
    name: 'Marcelo',
    email: 'Teste@gmail.com',
    password: '*__*senha*__*',
    token: '1234'
  });

  const api = useApi();

  // Criar uma função para fazer login do usuário
  // const login = (username, password, email, token) => {
  //   // Simular uma chamada de API para validar o usuário
  //   setTimeout(() => {
  //   // Se o usuário for válido, atualizar o estado do perfil
  //   if (username === "admin" && password === "1234") {

  //       setUser({ ...user, user: 'civil', password: '4321' })
  //       console.log(user.name, user.email, user.password, user.token)
  //     } else {
  //       // Se o usuário for inválido, mostrar um alerta
  //       alert("Usuário ou senha incorretos");
  //     }
  //   }, 1000);
  // };


  //função de verificação de token do localStorage 
  useEffect(() => {
    const verificarToken = () => {
      const tokenLocalStorage = localStorage.getItem('userToken')
      if (tokenLocalStorage) {
        //verifica se o token eh valido 
        if (apiVerificaToken) {
          setUser({
            ...user,
            email: localStorage.getItem('userEmail'),
            name: localStorage.getItem('userName'),
            token: localStorage.getItem('userToken')
          });
        }
        else {
          //se n for valido apaga os dados do localStorage
          setUser({ ...user, email: '', name: '', token: '' });
        }
      }
    }
    verificarToken();
  }, [])

  async function apiVerificaToken() {
    const validateApiToken = await api.ValidateToken(user.email, user.token);
    //retorna um boolean
    return validateApiToken.data;

  }

  // Vou mandar email e senha e vou receber Usuario email token 
  const login = async (email, password) => {

    const dataApi = await api.signIn(email, password);//Requisição ao back-end mandando o usuário e a senha  

    if (dataApi) {
      setUser({ ...user, email: dataApi.email, name: dataApi.name, token: dataApi.token });
      toast.success("dados recebidos");
      localStorage.setItem("userToken", dataApi.token);
      localStorage.setItem("userName", dataApi.name);
      localStorage.setItem("userEmail", dataApi.email);

      return true;
    }
    <Alert key="warning" variant="warning">
      This is a warning alert—check it out!
    </Alert>
    return false;


  }
  /*
  const setToken= (token)=>{
    localStorage.setItem('authToken',token);
  }*/


  // Criar uma função para fazer logout do usuário
  const logout = async () => {
    await api.logout();
    setUser(null);//Limpando o usuário
    //setToken('');//Limpando o localStorage

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
