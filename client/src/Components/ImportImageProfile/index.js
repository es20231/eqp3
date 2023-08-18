import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import './styles.scss'


function ImportImageProfile() {
    const api = useApi();
    const [imagemDownload, setImagemDownload] = useState('')

    async function ImportImagensApi() {
        
        const importImages = await api.importImageProfile();
    
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



export default ImportImageProfile;