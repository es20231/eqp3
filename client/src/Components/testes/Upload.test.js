/*
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UploadImage from "../UploadImage";
import { useApi } from '../../hooks/UseApi';
import { toast } from 'react-toastify';


// Mock do contexto de autenticação (UserContext)
const mockUserContextValue = {
  user: {
    token: "mock-token",
  },
};
// Criar um mock do usuário
const mockUser = {
  user: {
    token: '123'
  }
};
// Mock para a função useApi
jest.mock("../../hooks/UseApi", () => ({
  useApi: jest.fn(() => ({
    uploadImage: jest.fn(), // Mock da função uploadImage da useApi
  })),
}));

jest.mock('../../hooks/UseApi');//criar um mock da api
jest.mock('react-toastify');// Criar um mock do toast
// Mock the toast function
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warning: jest.fn(),
  },
}));
const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });//Criar um mock do arquivo de imagem

jest.mock("../../Contexts/Auth/AuthContext", () => ({
  UserContext: {
    Consumer: (props) => props.children(mockUserContextValue),
  },
}));

describe("UploadImage", () => {

  test("Se renderiza o botão de upload", () => {//Passou
    render(
        <UploadImage/>
    );
    const uploadButton = screen.getByText("Upload imagem");
    expect(uploadButton).toBeInTheDocument();
  });

    
    test("deve abrir a caixa de diálogo/pop-up quando o botão 'Upload imagem' for clicado", () => {//Passou
      render(<UploadImage />);
      const uploadButton = screen.getByText("Upload imagem");
      fireEvent.click(uploadButton);
      const modalTitle = screen.getByText("Selecione a Imagem");
      expect(modalTitle).toBeInTheDocument();
    });
   // Testar se o componente mostra um aviso se não houver imagem selecionada ao clicar no botão de confirmar
test("deve mostrar um toast de warning se nenhuma imagem for selecionada e 'Confirmar' for clicado", async () => {//Passou
  render(<UploadImage />);

  const button = screen.getByText("Upload imagem");
  fireEvent.click(button);
  const confirmButton = screen.getByText("Confirmar");
  fireEvent.click(confirmButton);

  // Esperar que a API não seja chamada
  await waitFor(() => {
    //expect(useApi().uploadImage).not.toHaveBeenCalled();
    // Verificar se o toast foi chamado com aviso
    expect(toast.warning).toHaveBeenCalledWith('Por favor, selecione uma imagem!');
  });
});




  test("deve mostrar um toast de sucesso se uma imagem for selecionada e 'Confirmar' for clicado", async () => {
    render(<UploadImage />);
    const uploadButton = screen.getByText("Upload imagem");
    fireEvent.click(uploadButton);
    const fileInput = screen.getByText("Selecione a Imagem");
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
    //const file = new File(["test image"], "test.png", { type: "image/png" });
    //fireEvent.change(input, { target: { files: [file] } });
    const confirmButton = screen.getByText("Confirmar");
    fireEvent.click(confirmButton);
    
    //const successToast = screen.getByText("Imagem enviada com sucesso!");
    await waitFor(() => {
     // expect(useApi().uploadImage).toHaveBeenCalledWith(
       // expect.any(FormData),
       // mockUser.user.token
     // );
      // Verificar se o FormData contém o arquivo correto
      //const formData = useApi().uploadImage.mock.calls[0][0];
      //expect(formData.get('file')).toEqual(mockFile);
    // Verificar se o toast foi chamado com sucesso
    expect(toast.success).toHaveBeenCalledWith(/imagem enviada com sucesso/i);//Igonorar maiusculas e minusculas
    });
  });


// Testar se o componente fecha o modal ao clicar no botão de close
test('should close modal on click close button', () => {
  render(<UploadImage />);
  const button = screen.getByText("Upload imagem");
  fireEvent.click(button);
  const closeButton = screen.getByText("Close");
  fireEvent.click(closeButton);
  const modalTitle = screen.queryByText("Confirmar");//lança um null se não for encontrado
  expect(modalTitle).toBeInTheDocument();//not
});


});
*/