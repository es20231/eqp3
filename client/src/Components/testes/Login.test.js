
import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { UserProvider } from '../../Contexts/Auth/AuthContext';
import Home from '../../Routes/Home';

import { UserContext } from "../../Contexts/Auth/AuthContext";
import { MemoryRouter } from 'react-router-dom';
import { useApi } from '../../hooks/UseApi';
import { toast } from 'react-toastify';






// Mock do react-toastify toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Criar um mock para a função login da API
jest.mock('../../hooks/UseApi', () => ({
  useApi: jest.fn(),
}));

// Função de utilidade para retornar uma promise resolvida com o valor especificado
const resolvedPromise = (value) => Promise.resolve(value);

describe('Home Component', () => {
  // Mock do contexto do usuário
  const mockUserContext = {
    login: jest.fn(),
  };

  beforeEach(() => {
    // Limpar mocks e dados antes de cada teste
    jest.clearAllMocks();
    useApi.mockReturnValue({
      login: jest.fn(),
    });
  });

  test("testando o botão criar conta ", () => {
    //Função para renderizar o componente

      render(
        
        <MemoryRouter>
        <UserContext.Provider value={mockUserContext}>
          <Home />
        </UserContext.Provider>
        </MemoryRouter>
      );


    expect(screen.getByText("Criar Conta")).toBeInTheDocument();
    expect(screen.getByLabelText('Name User')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

  })  

  
  test('submits login form', async () => {
     // Criar uma instância mockada do useApi
  const mockUseApi = {
    login: jest.fn().mockReturnValue(resolvedPromise({ status: 200 })),
  };

  // Simular a função login da API retornando uma promise resolvida
 // useApi.mockReturnValue(mockUseApi);

  render(
    <MemoryRouter>
      <UserContext.Provider value={mockUserContext}>
        <Home />
      </UserContext.Provider>
    </MemoryRouter>
  );

  // Simular a digitação de um nome de usuário e senha
  fireEvent.change(screen.getByLabelText('Name User'), { target: { value: 'john.doe' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

  // Simular o clique no botão de Entrar
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

  // Aguardar a execução das tarefas assíncronas (no caso, a função login da API)
  await waitFor(() => {
    expect(mockUseApi.login).toHaveBeenCalledWith('john.doe', 'password123');
  });
  // Verificar se o toast de sucesso foi exibido
  expect(toast.success).toHaveBeenCalledWith('login ok');
  });


  test('displays error toast if login fails', async () => {
  
jest.mock('../../hooks/UseApi', () => ({
  useApi: jest.fn(() => ({
    login: jest.fn().mockRejectedValue({ status: 401 }),
  })),
 

}));
    render(
      <MemoryRouter>
        <UserContext.Provider value={mockUserContext}>
          <Home />
        </UserContext.Provider>
      </MemoryRouter>
    );

    // Simular a digitação de um nome de usuário e senha inválidos
    fireEvent.change(screen.getByLabelText('Name User'), { target: { value: 'invalid_user' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'invalid_password' } });

    // Simular o clique no botão de Entrar
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    // Aguardar a execução das tarefas assíncronas (no caso, a função login da API)
    await Promise.resolve();
    
    // Verificar se a função login da API foi chamada corretamente
    expect(useApi().login).toHaveBeenCalledWith('invalid_user', 'invalid_password');
    // Verificar se o toast de erro foi exibido
    expect(toast.error).toHaveBeenCalledWith('dados errados');
  });

});

