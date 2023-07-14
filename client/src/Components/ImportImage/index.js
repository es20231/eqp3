import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import './styles.scss'



function ImportImage() {
    const [imagemDownload,setImagemDownload] = useState('')
    const api = useApi();
    async function ImportImagens() {

        const importImages = await api.ImportImage();
        // console.log(importImages);
        setImagemDownload(importImages);
    }

    return (
        <>
            <Button type="button" onClick={ImportImagens}> import images </Button>
            {<img src={imagemDownload} />}
        </>
    )
}

export default ImportImage;