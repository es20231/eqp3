
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { UserProvider } from '../../Contexts/Auth/AuthContext';
import Home from '../../Routes/Home';


const mockNavigate = jest.fn();//Retorna uma função fake
//Toda vez que o componete for fazer um import do react - router o jest vai substituir por essa declaração 
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate
}))



// Mock do contexto de usuário
jest.mock('../../Contexts/Auth/AuthContext', () => ({
  UserContext: {
    Consumer: ({ children }) => children({ login: jest.fn() }), // Simula a função de login do contexto
  },
}));


// Mock do contexto de autenticação (UserContext)
const mockUserContextValue = {
  user: {
    token: "mock-token",
  },
};

jest.mock("../../Contexts/Auth/AuthContext", () => ({
  UserContext: {
    Consumer: (props) => props.children(mockUserContextValue),
  },
}));
/*
const renderComponente= ()=>{
    render (
        <BrowserRouter>
            <UserProvider>
                <Home/>
            </UserProvider>
        </BrowserRouter>
    )

    return { }
}

*/


describe("Login do usuário", () => {

  test("testando o botão criar conta ", () => {
    //Função para renderizar o componente
    render(

      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>

    )

    expect(screen.getByText("Criar Conta")).toBeInTheDocument();

  })


  test("Testando botão de Entrar", () => {
    render(

      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>

    );
    //Salvar o elemento em uma constante
    const btnEntrar = screen.getByText("Entrar");
    //Função utilitaria que dispara um evento
    fireEvent.click(btnEntrar)
    //Espero que a função navigate tenha sido chamada com o parâmetro correto
    expect(mockNavigate).toHaveBeenCalledWith('/Private');

  })



  // Teste de interação do usuário
  test('chama a função isLogged quando o formulário é enviado com dados válidos', () => {

    React.Component.render(

      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>

    );
    const mockIsLogged = jest.fn(); // Simula a função isLogged

    const nameInput = screen.getByLabelText(/Name User/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/Entrar/i);

    // Preenche os campos do formulário
    fireEvent.change(nameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Submete o formulário
    fireEvent.click(submitButton);

    // Verifica se a função isLogged foi chamada corretamente
    expect(mockIsLogged).toHaveBeenCalledTimes(1);
  });


  // Teste de exibição de mensagem de aviso
  test('exibe toast de aviso quando o login falha', () => {

    render(
      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>
    );
    const mockIsLogged = jest.fn().mockReturnValue(false); // Simula a função isLogged retornando falso

    const nameInput = screen.getByLabelText(/Name User/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/Entrar/i);

    // Preenche os campos do formulário
    fireEvent.change(nameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Submete o formulário
    fireEvent.click(submitButton);

    // Verifica se a mensagem de aviso é exibida corretamente
    const warningToast = screen.getByText(/necessário fazer um login/i);
    expect(warningToast).toBeInTheDocument();


  });







})


