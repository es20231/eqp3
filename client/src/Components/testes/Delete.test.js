// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import FotosGaleria from "../FotosGaleria";

// // Mock da função useApi
// const mockDeleteImage = jest.fn();
// jest.mock("../../hooks/UseApi", () => ({
//   useApi: () => ({
//     deleteImage: mockDeleteImage,
//   }),
// }));

// test("Renderiza a imagem corretamente e verifica se a função handleDelete é chamada ao clicar no botão de lixeira", () => {
//   const urlImg = {
//     data: "url-da-imagem.jpg",
//     index: 0,
//   };

//   render(<FotosGaleria {...urlImg} />);

//   // Verifica se a imagem é renderizada corretamente
//   const imageElement = screen.getByAltText("Imagem 1");
//   expect(imageElement).toBeInTheDocument();//Verifica se a imagem está presente
//   expect(imageElement).toHaveAttribute("src", "url-da-imagem.jpg");

//   // Simula o clique no botão trash 

//  // Encontra o botão trash pelo atributo data-testid
//  const trashButton = screen.getByTestId("trash-button");

//  // Simula o clique no botão trash
//  fireEvent.click(trashButton);

//   // Verifica se a função handleDelete é chamada quando o botão trash é clicado
//   expect(mockDeleteImage).toHaveBeenCalledTimes(1);
// });
