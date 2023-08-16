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
    imagePerfil: '',
    fullname: '',
    password: '',
    token: '',
    description: ''
  });

  const [userUpdateData, setUserUpdateData] = useState(false)
  // const [userUpdateLogin, setUserUpdateLogin] = useState(false)
  const api = useApi();
  const navigate = useNavigate();

  const dataUserApi = async () => {
    try {
      const dataApi = await api.dataUser(); // REsposta do Back com token
      try {

        const dataIMgPerfil = await api.importImageProfile();
        // console.log("----Data APi ----");


        setUser({
          user,
          profile_picture: dataIMgPerfil,
          email: dataApi.email,
          description: dataApi.description,
          fullname: dataApi.fullname,
          username: dataApi.username,
          token: dataApi.token
        }); // Setting the user object
        // toast.success("dados recebidos");

        // localStorage.setItem("userToken", dataApi.data.token); // Storing the user token in the localStorage
        // navigate("/private");
        // return true;
        console.log("profile image: " + user.profile_picture)
      } catch (error) {
        toast.warning("receber imagem de perfil");
        const dataIMgPerfil = await api.importImageProfile();
        setUser({
          user,
          profile_picture: dataIMgPerfil,
        })
      }
    }
    // throw new Error("Invalid credentials");
    catch (error) {
      toast.warning("Login necessário");

      return false;
    }
  }

  //função de verificação de token do localStorage 
  useEffect(() => {
    const verificarToken = () => {
      const tokenLocalStorage = localStorage.getItem('userToken')



      if (tokenLocalStorage) {
        //verifica se o token eh valido
        // toast.success("possui um token")
        if (apiVerificaSession) {
          // toast.success("possui uma Session")
          setUser({
            ...user,
            // email: localStorage.getItem('userEmail'),
            // name: localStorage.getItem('userName'),
            token: localStorage.getItem('userToken')
          });



          navigate('/Private');
        }
        else {
          // toast.warning("sem token no localStorage")
          //limpando dados 
          setUser(null); // Clearing the user
          localStorage.removeItem("userToken"); // Clearing the localStorage
          toast.warning("Sessão expirada. ")
        }
      }

    }


    verificarToken();
    dataUserApi();
  }, [userUpdateData])

  async function apiVerificaSession() {
    const validateApiToken = await api.IsLogged();
    //retorna um boolean

    if (validateApiToken == 200) {
      return true;
    } else {
      return false;
    }

  }

  // Vou mandar email e senha e vou receber Usuario email token 
  const login = async (userName, password) => {
    try {
      const dataApi = await api.login(userName, password); // REsposta do Back com token

      setUser({
        email: dataApi.email,
        fullname: dataApi.fullname,
        name: dataApi.name,
        token: dataApi.token
      }); // Setting the user object
      toast.success("dados recebidos");
      dataUserApi();
      localStorage.setItem("userToken", dataApi.data.token); // Storing the user token in the localStorage
      navigate("/private");
      return true;

    }
    // throw new Error("Invalid credentials");
    catch (error) {
      toast.error("error");

      return false;
    }
  };




  // Criar uma função para fazer logout do usuário
  const logout = async () => {
    try {

      setUser(null); // Clearing the user
      localStorage.removeItem("userToken"); // Clearing the localStorage

      await api.logout();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Retornar o componente provedor com o valor do contexto
  return (
    <UserContext.Provider value={{ user, setUser, userUpdateData, setUserUpdateData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Exportar o contexto e o provedor
export { UserContext, UserProvider };
