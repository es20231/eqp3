import { useContext, useState, useEffect } from "react";

import { Row, Col,Button } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import './styles.scss'
import FotosGaleria from "../FotosGaleria";
import { UserContext } from "../../Contexts/Auth/AuthContext";



function ImportListImage() {
    const api = useApi();
    const [imagemDownload, setImagemDownload] = useState({
        url: '',
        filename: ''
      });
    const userLocal = useContext(UserContext);


    useEffect(() => {
        //Runs only on the first render
        const importImagensApi = async () => {
            const images = await api.importListImage();
            console.log(images);
            // Use Promise.all to fetch all images in parallel
            if (images) {
                const importImages = await Promise.all(images.data.map( async(dataName) => {
                    return ({
                        url:await api.importImage(dataName),
                        filename: dataName
                    });

                }));
                setImagemDownload(importImages);
            }
        }

        importImagensApi();

    }, [userLocal.userUpdateData]);

    async function ImportImagensApi () {
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



    return (
        <>
           
            <Row md = {3}>
                {imagemDownload.length > 0 && imagemDownload.map((urlImg, index) => (

                    <Col key={index} sm={true}>
                        <FotosGaleria key={index} data={urlImg.url}></FotosGaleria>
                        
                    </Col>

                ))}
            </Row>
        </>
    );
}

export default ImportListImage;