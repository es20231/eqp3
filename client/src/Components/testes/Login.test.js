
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// import "@testing-library/jest-dom/extend-expect";
// import { BrowserRouter, useNavigate } from 'react-router-dom';
// import { UserProvider } from '../../Contexts/Auth/AuthContext';
// import Home from '../../Routes/Home';

// import { UserContext } from "../../Contexts/Auth/AuthContext";
// import { MemoryRouter } from 'react-router-dom';
// import { useApi } from '../../hooks/UseApi';
// import { toast } from 'react-toastify';






// // Mock do react-toastify toast
// jest.mock('react-toastify', () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// // Criar um mock para a função login da API
// jest.mock('../../hooks/UseApi', () => ({
//   useApi: jest.fn(),
// }));

// // Função de utilidade para retornar uma promise resolvida com o valor especificado
// const resolvedPromise = (value) => Promise.resolve(value);

// describe('Home Component', () => {
//   // Mock do contexto do usuário
//   const mockUserContext = {
//     login: jest.fn(),
//   };

//   beforeEach(() => {
//     // Limpar mocks e dados antes de cada teste
//     jest.clearAllMocks();
//     useApi.mockReturnValue({
//       login: jest.fn(),
//     });
//   });

//   test("testando o botão criar conta ", () => {
//     //Função para renderizar o componente

//       render(
        
//         <MemoryRouter>
//         <UserContext.Provider value={mockUserContext}>
//           <Home />
//         </UserContext.Provider>
//         </MemoryRouter>
//       );


//     expect(screen.getByText("Criar Conta")).toBeInTheDocument();
//     expect(screen.getByLabelText('Name User')).toBeInTheDocument();
//     expect(screen.getByLabelText('Password')).toBeInTheDocument();

//   })  

  
//   test('submits login form', async () => {
//      // Criar uma instância mockada do useApi
//   const mockUseApi = {
//     login: jest.fn().mockReturnValue(resolvedPromise({ status: 200 })),
//   };

//   // Simular a função login da API retornando uma promise resolvidaw
//  // useApi.mockReturnValue(mockUseApi);

//   render(
//     <MemoryRouter>
//       <UserContext.Provider value={mockUserContext}>
//         <Home />
//       </UserContext.Provider>
//     </MemoryRouter>
//   );

//   // Simular a digitação de um nome de usuário e senha
//   fireEvent.change(screen.getByLabelText('Name User'), { target: { value: 'john.doe' } });
//   fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

//   // Simular o clique no botão de Entrar
//   fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

//   // Aguardar a execução das tarefas assíncronas (no caso, a função login da API)
//   await waitFor(() => {
//     expect(mockUseApi.login).toHaveBeenCalledWith('john.doe', 'password123');
//   });
//   // Verificar se o toast de sucesso foi exibido
//   expect(toast.success).toHaveBeenCalledWith('login ok');
//   });


//   test('displays error toast if login fails', async () => {
  
// jest.mock('../../hooks/UseApi', () => ({
//   useApi: jest.fn(() => ({
//     login: jest.fn().mockRejectedValue({ status: 401 }),
//   })),
 

// }));
//     render(
//       <MemoryRouter>
//         <UserContext.Provider value={mockUserContext}>
//           <Home />
//         </UserContext.Provider>
//       </MemoryRouter>
//     );

//     // Simular a digitação de um nome de usuário e senha inválidos
//     fireEvent.change(screen.getByLabelText('Name User'), { target: { value: 'invalid_user' } });
//     fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'invalid_password' } });

//     // Simular o clique no botão de Entrar
//     fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

//     // Aguardar a execução das tarefas assíncronas (no caso, a função login da API)
//     await Promise.resolve();
    
//     // Verificar se a função login da API foi chamada corretamente
//     expect(useApi().login).toHaveBeenCalledWith('invalid_user', 'invalid_password');
//     // Verificar se o toast de erro foi exibido
//     expect(toast.error).toHaveBeenCalledWith('dados errados');
//   });

// });
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import { MemoryRouter } from 'react-router-dom';
import Home from '../../Routes/Home';
import "@testing-library/jest-dom/extend-expect";


// Mock da função useApi
const mockLogin = jest.fn((username, password) => {
  // Simula a resposta do login com base nos parâmetros recebidos
  if (username === "testuser" && password === "testpassword") {
    return Promise.resolve({ status: 200 });
  } else {
    return Promise.resolve({ status: 400 });
  }
});
jest.mock("../../hooks/UseApi", () => ({
  useApi: () => ({
    login: mockLogin,
  }),
}));

// Mock do Toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: jest.fn(({ children }) => <div>{children}</div>),

}));


test("Renderiza os campos do formulário e realiza o login corretamente", async () => {
  // Definindo um valor de usuário e senha válidos para o teste de login bem-sucedido
  const validUsername = "testuser";
  const validPassword = "testpassword";

  render(
    <BrowserRouter>
      <UserContext.Provider value={{ login: mockLogin }}>
        <Home />
      </UserContext.Provider>
    </BrowserRouter>
  );


  // Verifica se os campos do formulário estão renderizados corretamente
  const nameInput = screen.getByLabelText(/name user/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /entrar/i });

  // Simula a digitação nos campos de usuário e senha
  fireEvent.change(nameInput, { target: { value: validUsername } });
  fireEvent.change(passwordInput, { target: { value: validPassword } });

  // Simula a submissão do formulário
  await fireEvent.click(submitButton);

  // Aguarda até que a função toast.success seja chamada
  await waitFor(() => {
    expect(require("react-toastify").toast.success).toHaveBeenCalledWith("login ok");
  });
});

// test("Renderiza os campos do formulário e realiza o login corretamente", async () => {
//   // Definindo um valor de usuário e senha válidos para o teste de login bem-sucedido
//   const validUsername = "testuser";
//   const validPassword = "testpassword";

//   render(
//     <MemoryRouter>
//       <UserContext.Provider value={{ login: mockLogin }}>
//         <Home />
//       </UserContext.Provider>
//       </MemoryRouter>
//   );

//   // Verifica se os campos do formulário estão renderizados corretamente
//   const nameInput = screen.getByLabelText(/name user/i);
//   const passwordInput = screen.getByLabelText(/password/i);
//   const submitButton = screen.getByRole("button", { name: /entrar/i });

//   // Simula a digitação nos campos de usuário e senha
//   fireEvent.change(nameInput, { target: { value: validUsername } });
//   fireEvent.change(passwordInput, { target: { value: validPassword } });

//   // Simula a submissão do formulário
//   fireEvent.click(submitButton);

//   // Aguarda até que o toast de login bem-sucedido seja exibido
//   await waitFor(() => {
//     //expect(screen.getByText(/login ok/i)).toBeInTheDocument();
//     expect(require("react-toastify").toast.success).toHaveBeenCalledWith("login ok"); 

//   });
// });

// test("Redireciona para a página de registro quando o botão 'Criar Conta' é clicado", () => {
//   render(
//     <BrowserRouter>
//       <Home />
//     </BrowserRouter>
//   );

//   // Encontra o botão "Criar Conta" e simula o clique
//   const criarContaButton = screen.getByRole("button", { name: /criar conta/i });
//   fireEvent.click(criarContaButton);

//   // Verifica se a navegação para a página de registro foi acionada
//   expect(screen.getByText(/página de registro/i)).toBeInTheDocument();
// });

