import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import FotosDashboard from "../FotosDashboard";
import axios from "axios";
import DashboardPerfil from "../../Routes/DashboardPerfil";
//import DashboardPerfil from "../DashBoard";
//import DeleteImage from "../DeleteImage";
 import "./styles.scss"
 import { useApi } from "../../hooks/UseApi";



function UploadImage() {
  // Criar um estado para armazenar a imagem selecionada pelo usuário
  const [image, setImage] = useState("");

  const api = useApi();


  // Criar uma função para lidar com a mudança do input do tipo file
  const handleChange = (e) => {
    // Verificar se o usuário selecionou um arquivo
    if (e.target.files && e.target.files.length > 0) {
      // Pegar o primeiro arquivo selecionado
      const file = e.target.files[0];

      //VERIFICAR O TAMANHO DA IMAGEM QUE É PERMITIDO
      const size = file.size /1024 /1024 //Converter bytes para megabytes
      const tamMax = 16
        if (size > tamMax ){
          setError(`Tamanho excede o tamanho máximo é ${tamMax} MB`)
          setImage(null)//Remove imagem 
        }else{
          setError(null)//Remove mensagem de erro 

        }

      
      setImage(file);//Atualiza o estado da mensagem 
    }
  };


  const handleSubmit =async (e) => {
    // Prevenir o comportamento padrão do formulário
    e.preventDefault();//Evita que a pagina seja recarregada ou redirecionada ao enviar o formuário
    // Verificar se há uma imagem selecionada
    
    //useEffect(()=>{
    if (image) {
      // Lógica para enviar o arquivo para o servidor e adicionar a imagem no dashboard    

      const formData = new FormData();
      // Adiciona o arquivo da imagem ao formData com o nome "image"
      formData.append("image", e.target.files[0]);

      const headers ={
        'headers':{
          'Content - Type ' : 'application/json'
        }
      }

      await axios.post("http://localhost:5000/upload", formData,headers)
        .then(response => {
          // Se a requisição foi bem sucedida, mostra uma mensagem e atualiza o estado da imagem
          console.log(response);
          alert("Imagem enviada com sucesso!");
          setImage(response.data.image);
          //pegou a imagem

          // push api para mandar a imagem para o servidor e depois 

          // chamar um useEffect pra uma segunda chamada na Api

        })
        .catch(error => {
          // Se a requisição falhou, mostra uma mensagem de erro
          console.log(error);
          alert("Erro ao enviar a imagem!");
        });

      


      alert("Imagem enviada com sucesso!");
    } 
    
    else {
      // Mostrar uma mensagem de erro se não houver imagem
      alert("Por favor, selecione uma imagem!");
    }
  //},[image]);
  };


  return (
    <div className="UploadImage">
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <Button type="submit">Enviar</Button>
      </form>

      <img src= {image}/>
      {image && <img src={image} alt="Imagem selecionada" />}

      {/* image && <FotosDashboard image={image}/> }
           {console.log(image)*/}

    </div>


  );


}

export default UploadImage;