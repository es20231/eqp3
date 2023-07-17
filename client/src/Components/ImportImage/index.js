import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import './styles.scss'



function ImportImage() {
    const api = useApi();
    const [imagemDownload, setImagemDownload] = useState('')

    async function ImportImagensApi() {

        const importImages = await api.importImage();
        // console.log(importImages);
        setImagemDownload(importImages);
    }

    return (
        <>
            <Button type="button" onClick={ImportImagensApi}> import images </Button>
            {<img src={imagemDownload} />}
        </>
    )
}

export default ImportImage;