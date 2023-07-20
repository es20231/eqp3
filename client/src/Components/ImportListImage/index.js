import React from "react";
import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import { useEffect } from "react";
import './styles.scss'
import FotosGaleria from "../FotosGaleria";


function ImportListImage() {
    const api = useApi();
    const [imagemDownload, setImagemDownload] = useState([]);

    useEffect(() => {
        //Runs only on the first render
         const ImportImagensApi = async () => {
            setImagemDownload([]);
            const images = await api.importListImage();
            console.log(images.data);

            images.data.map(async (dataName) => {
                const importImages = await api.importImage(dataName);
                setImagemDownload((prev) => [...prev, importImages]);
            });

            console.log("teste de armazenamento");
            console.log(imagemDownload);
        }

        ImportImagensApi();

    }, []);

    async function ImportImagensApi () {
        setImagemDownload([]);
        const images = await api.importListImage();
       // console.log(images.data);

        images.data.map(async (dataName) => {
            const importImages = await api.importImage(dataName);
            setImagemDownload((prev) => [...prev, importImages]);
        });

        console.log("teste de armazenamento");
        console.log(imagemDownload);
    }



    return (
        <>
             <Button type="button" onClick={ImportImagensApi}>
                baixar imagens do usuário
            </Button> 
            <Row>
                {imagemDownload.map((urlImg) => (

                    <Col>
                        <FotosGaleria data={urlImg}></FotosGaleria>
                    </Col>

                ))}
            </Row>
        </>
    );
}

export default ImportListImage;
