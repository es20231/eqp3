import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import './styles.scss'


function ImportImage() {
    const api = useApi();
    const [imagemDownload, setImagemDownload] = useState('')

    async function ImportImagensApi() {
        const images = await api.importListImage()
      
        const importImages = await api.importImage(images.data[4])
    
        // console.log(importImages);
        setImagemDownload(importImages);
    }

    return (
        <>
            <Button type="button" onClick={ImportImagensApi}> serve images </Button>
            {<img src={imagemDownload} />}
        </>
    )
}



export default ImportImage;