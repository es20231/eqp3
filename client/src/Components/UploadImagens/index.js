import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
//import DashboardPerfil from "../DashBoard";
//import DeleteImage from "../DeleteImage";

function UploadImage(){
 // Criar um estado para armazenar a imagem selecionada pelo usuário
 const [image, setImage] = useState(null);


 

 // Criar uma função para lidar com a mudança do input do tipo file
 const handleChange = (e) => {
    // Verificar se o usuário selecionou um arquivo
    if (e.target.files && e.target.files.length > 0) {
      // Pegar o primeiro arquivo selecionado
      const file = e.target.files[0];
      // Criar um objeto URL para representar o arquivo como uma string. Permite mostrar a imagem na tela sem precisar enviar par o servidor ou salvar no disco.
      const url = URL.createObjectURL(file);
      // Atualizar o estado da imagem com a url
      setImage(url);
    }
  };


const handleSubmit=(e)=>{
  // Prevenir o comportamento padrão do formulário
  e.preventDefault();//Evita que a pagina seja recarregada ou redirecionada ao enviar o formuário
  // Verificar se há uma imagem selecionada
  if (image) {
    // Lógica para enviar o arquivo para o servidor e adicionar a imagem no dashboard    
/*
    const formData = new FormData();
  // Adiciona o arquivo da imagem ao formData com o nome "image"
  formData.append("image", e.target.files[0]);
    axios.post("/api/images", formData)
     .then(response => {
      // Se a requisição foi bem sucedida, mostra uma mensagem e atualiza o estado da imagem
      console.log(response);
      alert("Imagem enviada com sucesso!");
      setImage(response.data.image);

    })
    .catch(error => {
      // Se a requisição falhou, mostra uma mensagem de erro
      console.log(error);
      alert("Erro ao enviar a imagem!");
    });


  
*/
    alert("Imagem enviada com sucesso!");
  } else {
    // Mostrar uma mensagem de erro se não houver imagem
    alert("Por favor, selecione uma imagem!");
  }
};


    return(
        <div className="UploadImage">
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleChange} />
                <Button  type="submit">Enviar</Button>
            </form>

           
             {image && <img src={image} alt="Imagem selecionada"/>}

        </div>

        
    );


}

export default UploadImage;