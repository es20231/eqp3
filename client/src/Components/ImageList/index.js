import React from "react";
import { useEffect,useState } from "react";
import { useApi } from "../../hooks/UseApi";


function ImageList (){

const api =useApi()

    const [data,setData]=useState([])
    const [url,setUrl]=useState('')


    const getImages= async  ()=>{

        await api.get("http://locahost:5000/dashboard")
        .then((response)=>{
            console.log(response.data)
            setData(response.data.image)//Quando recebe do backend
            setUrl(response.data.path_name)//recebe o endereço
        }).catch((err)=> {
            console.log(err.response)
        })

    }
    useEffect(()=>{//Quando carregar a página chame a função getImages
        getImages();
    },[]);//Execute uma única vez
 

    return(
        <div>

            {data.map(image => (
            <div key={image.id}>
                
                <img src={url + image.image } alt={image.id}/>

            </div>
            ))}
            
        </div>

);


};

export default ImageList;