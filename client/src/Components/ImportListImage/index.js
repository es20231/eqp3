import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import './styles.scss'
// import image from '../../../../api/api/static/images/dragon3.jpeg'



function ImportListImage() {
    const api = useApi();
    const [imagesDashboard, setImagesDashboard] = useState([])
    const [imagesObj, setImagesObj] = useState([])
    async function ImportImagensApi() {

        const importImages = await api.importListImage();
        // const imagens = JSON.parse(importImages);

        console.log(importImages);
        // console.log(imagens);
        setImagesDashboard(importImages.data);

        // useEffect(() => {
        //     fetch('path/to/image')
        //         .then((res) => res.blob())
        //         .then((blob) => {
        //             setImagesObj(URL.createObjectURL(blob));
        //         });
        // },[]);

        // const base64 = btoa(
        //     new Uint8Array(importImages).reduce(
        //         (data, byte) => data + String.fromCharCode(byte),
        //         ''
        //     )
        // )
        // setImagesDashboard([...imagesDashboard, base64]);
        // setImagemDownload(importImages);
    }

    return (
        <>
            <Button type="button" onClick={ImportImagensApi}> import images </Button>
            {/* <img src={imagesDashboard}></img> */}
            {imagesDashboard.map((image, index) => (
                <>
                    <img key={index} src={image.filename} alt={image.filename} />

                </>
            ))}
            {/* <img src={image} alt="test"></img> */}
            {/* {imagesObj.map((image, index) => (
                <>
                    <img key={index} src={image} alt={"teste"} />

                </>
            ))} */}
        </>
    )
}

export default ImportListImage;