import React from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import { useEffect } from "react";
import './styles.scss'
import FotosGaleria from "../FotosGaleria";


function ImportListImage() {
    const api = useApi();
    const [imagemDownload, setImagemDownload] = useState([]);



    useEffect(() => {
        //Runs only on the first render
        const importImagensApi = async () => {
            const images = await api.importListImage();

            // Use Promise.all to fetch all images in parallel
            if (images) {
                const importImages = await Promise.all(images.data.map(dataName => api.importImage(dataName)));
                setImagemDownload(importImages);
            }
        }

        importImagensApi();

    }, []);



    return (
        <>
            {/* <Button type="button" onClick={ImportImagensApi}>
                baixar imagens do usuário
            </Button> */}
            <Row>
                {imagemDownload.length > 0 && imagemDownload.map((urlImg, index) => (

                    <Col key={index}>
                        <FotosGaleria key={index} data={urlImg}></FotosGaleria>
                    </Col>

                ))}
            </Row>
        </>
    );
}

export default ImportListImage;
