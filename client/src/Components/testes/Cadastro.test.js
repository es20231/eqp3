import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../../Routes/Register";
import "@testing-library/jest-dom/extend-expect";
import { toast } from "react-toastify";

// Simulações (mocks) para react-router-dom
jest.mock("react-router-dom", () => ({
  NavLink: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
}));

// Simulações (mocks) para react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warning: jest.fn(),
  },
}));

// Simulação (mock) para o hook useApi
jest.mock("../../hooks/UseApi", () => ({
  useApi: () => ({
    register: jest.fn().mockResolvedValue({ status: 200 }),
  }),
}));

describe("Componente Register", () => {
  test("renderiza todos os campos do formulário", () => {
   
    render(
    <Register />);

    expect(screen.getByLabelText("User")).toBeInTheDocument();
    expect(screen.getByLabelText("User_Full_Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });
 
  test("envia o formulário ao clicar no botão", async () => {
    render(<Register />);
    const submitButton = screen.getByText("Entrar");
    fireEvent.click(submitButton);

    // O hook useApi foi simulado para resolver com status 200,
    // então esperamos que o toast de sucesso seja chamado
    await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith("cadastro enviado");
    });
  });


  // test("lida com o cadastro mal-sucedido", async () => {
  //   // Simulação (mock) para o hook useApi retornando status diferente de 200
  //   jest.mock("../../hooks/UseApi", () => ({
  //     useApi: () => ({
  //       register: jest.fn().mockResolvedValue({ status: 400 }),
  //     }),
  //   }));

  //   render(<Register />);
  //   const submitButton = screen.getByText("Entrar");
  //   fireEvent.click(submitButton);

  //   // O hook useApi foi simulado para resolver com status 400,
  //   // então esperamos que o toast de erro seja chamado
  //   await waitFor(() => {
  //       expect(toast.warning).toHaveBeenCalledWith("erro ao enviar cadastro");
  //   });
  // });
  

});
