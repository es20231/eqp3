import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FotosGaleria from "../FotosGaleria";
import ImportListImage from "../ImportListImage";
// Mock da função useApi
const mockImportListImage = jest.fn(() => ({
  data: ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"],
}));
const mockImportImage = jest.fn((image) => Promise.resolve(image));
jest.mock("../../hooks/UseApi", () => ({
  useApi: () => ({
    importListImage: mockImportListImage,
    importImage: mockImportImage,
  }),
}));
// Mock do módulo axios
jest.mock("axios");

test("O botão é clicável", () => {//Passou
  render(<ImportListImage />);

  const button = screen.getByRole("button", { name: /baixar imagens do usuário/i });//Se o botão é clicável
  fireEvent.click(button);
});


test("O componente renderiza corretamente", () => {//Passou porem ele não encontra "img"
  render(<ImportListImage />);

  // Verifica se nenhuma imagem é exibida inicialmente
  const images = screen.queryAllByRole("img");
  expect(images).toHaveLength(0);
});


//Mock da função useApi

/*
test("O botão é clicável e as imagens são exibidas corretamente após o clique", async () => {
  render(<ImportListImage />);

  const button = screen.getByRole("button", { name: /baixar imagens do usuário/i });//Se o botão é clicável
  fireEvent.click(button);

  // Aguarda até que todas as imagens sejam exibidas (pode ser necessário ajustar o seletor seletor dependendo do local onde as imagens são renderizadas)
  await waitFor(() => {
    //const images = screen.getAllByRole("img");//Está dentro de Fotos galeria.
    //expect(images).toHaveLength(5);
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`image${i}`)).toBeInTheDocument();
    }
  });

  // Verifica se a função importListImage foi chamada
  expect(mockImportListImage).toHaveBeenCalledTimes(1);

  // Verifica se a função importImage foi chamada cinco vezes, uma para cada imagem
  expect(mockImportImage).toHaveBeenCalledTimes(5);
});




*/

