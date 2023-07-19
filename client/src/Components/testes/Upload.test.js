import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UploadImage from "../UploadImage";

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

describe("UploadImage", () => {
  test("should render without errors", () => {
    render(
        <UploadImage/>
    );
    const uploadButton = screen.getByText("Upload imagem");
    expect(uploadButton).toBeInTheDocument();
  });

  test("deve abrir a caixa de diálogo/pop-up quando o botão 'Upload imagem' for clicado", () => {
    render(<UploadImage />);
    const uploadButton = screen.getByText("Upload imagem");
    fireEvent.click(uploadButton);
    const modalTitle = screen.getByText("Selecione a Imagem");
    expect(modalTitle).toBeInTheDocument();
  });

  test("deve fechar a caixa de diálogo/pop-up quando o botão 'Fechar' for clicado", () => {
    render(<UploadImage />);
    const uploadButton = screen.getByText("Upload imagem");
    fireEvent.click(uploadButton);
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    const modalTitle = screen.queryByText("Selecione a Imagem");
    expect(modalTitle).not.toBeInTheDocument();
  });

  test("deve mostrar um toast de warning se nenhuma imagem for selecionada e 'Confirmar' for clicado", () => {
    render(<UploadImage />);
    const uploadButton = screen.getByText("Upload imagem");
    fireEvent.click(uploadButton);
    const confirmButton = screen.getByText("Confirmar");
    fireEvent.click(confirmButton);
    const warningToast = screen.getByText("Por favor, selecione uma imagem!");
    expect(warningToast).toBeInTheDocument();
  });

  test("deve mostrar um toast de sucesso se uma imagem for selecionada e 'Confirmar' for clicado", () => {
    render(<UploadImage />);
    const uploadButton = screen.getByText("Upload imagem");
    fireEvent.click(uploadButton);
    const input = screen.getByLabelText("Selecione a Imagem");
    const file = new File(["test image"], "test.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });
    const confirmButton = screen.getByText("Confirmar");
    fireEvent.click(confirmButton);
    const successToast = screen.getByText("Imagem enviada com sucesso!");
    expect(successToast).toBeInTheDocument();
  });
});
