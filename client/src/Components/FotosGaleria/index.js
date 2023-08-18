// import  { useContext, useState } from "react";
// import { Button,Modal,Form } from "react-bootstrap";
// import './styles.scss'
// import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
// import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';
// import { useApi } from "../../hooks/UseApi";
// import { UserContext } from "../../Contexts/Auth/AuthContext";


// function FotosGaleria(urlImg) {
//     const api = useApi();
//     const userLocal = useContext(UserContext)
//     const [descriptionText, setDescriptionText] = useState('')
//     //Modal 
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);


//     async function postImage() {
//         //abre um modal para adicionar uma descrição 
//         <>
//             <Button variant="primary" onClick={handleShow}>
//                 Launch demo modal
//             </Button>

//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Modal heading</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>

//                         <Form.Group
//                             className="mb-3"
//                             controlId="exampleForm.ControlTextarea1"
//                         >
//                             <Form.Label>Adicione a Descrição</Form.Label>
//                             <Form.Control as="textarea" onChange={setDescriptionText(event)} rows={3} />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleClose}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     }


//     return (
//         <div className="containerElement">
//             <div className="ContainerImg">
//                 <img src={urlImg.data.url} alt={`Imagem ${urlImg.index + 1}`} />

//             </div>
//             <div className="queixoImage">
//                 <button
//                     onClick={
//                         async () => {
//                             handleShow
//                             postImage
//                             await api.postImage(urlImg.data.filename, descriptionText)
//                         }
//                     }>
//                     <img src={postImgIcon} />
//                 </button>
//                 <button data-testid="trash-button"
//                     onClick={
//                         async () => {
//                             await api.deleteImage(urlImg.data.filename);
//                             userLocal.setUserUpdateData(!userLocal.userUpdateData);
//                         }}
//                 >
//                     <img src={trash} />
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default FotosGaleria;
//----------------------
import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import './styles.scss';
import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';
import { useApi } from "../../hooks/UseApi";
import { UserContext } from "../../Contexts/Auth/AuthContext";
//import Caman from 'caman'
import * as PIXI from 'pixi.js';
//import { Application, Sprite } from 'pixi.js';



function FotosGaleria(urlImg) {
    const api = useApi();
    const userLocal = useContext(UserContext);
    const [descriptionText, setDescriptionText] = useState('');
    const [show, setShow] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null)
    const [pixiApp, setPixiApp] = useState(null);
    const [imageTexture, setImageTexture] = useState(null);
    const [filteredImageDataURL, setFilteredImageDataURL] = useState(null);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imageRef = useRef(null); // Ref para a imagem
    const containerRef = useRef(null); // Ref para o container do PixiJS


    const [filter, setFilter] = useState(null);
    //Sequência de Renderização: Garanta que a sequência de renderização esteja correta. É importante primeiro criar a aplicação PixiJS, em seguida, carregar a textura da imagem, adicionar o sprite ao palco, aplicar o filtro e, por fim, renderizar a aplicação PixiJS.

    useEffect(() => {//Para monitorar as alterações em pixiapp e selectedFilter
        if (pixiApp && selectedFilter !== null) {
            // Chama a função applyFilter quando pixiapp ou selectedFilter mudam
            applyFilter();
        }
    }, [pixiApp, selectedFilter,filter]);

  

   
    function applyFilter() {
        if (!pixiApp) {

            // Cria uma nova instância da aplicação PixiJS
            const app = new PIXI.Application({
                width: 320,
                height: 300,
                transparent: true,
            });
            // Define a instância da aplicação PixiJS no estado pixiApp
            setPixiApp(app);

            // Cria uma textura a partir da URL da imagem fornecida
            const texture = PIXI.Texture.from(urlImg.data.url);//Pegando a imagem

            setImageTexture(texture);

            // Adiciona a visualização da aplicação PixiJS ao elemento HTML referenciado por containerRef
            containerRef.current.appendChild(app.view);

            // Cria um sprite (um elemento visual) com a textura da imagem
            const sprite = new PIXI.Sprite(texture);//DisplayObject que envolve um recurso de imagem carregado

            // Define as coordenadas (x, y) do sprite
            sprite.x = 0;
            sprite.y = 0;

            // app.stage.addChild(sprite);//Adicionando num conteiner



            if (selectedFilter === 'brightness') {
                const filterAux = new PIXI.filters.ColorMatrixFilter();
                setFilter(filter => filterAux.brightness(2))

            } else if (selectedFilter === 'contrast') {
                const filterAux = new PIXI.filters.ColorMatrixFilter();
                setFilter(filter => filterAux.contrast(1.5))

            } else if (selectedFilter === 'blackWhite') {
                const filterAux = new PIXI.filters.ColorMatrixFilter();
                setFilter(filter => filterAux.blackAndWhite())

            }

            if (filter) {
                sprite.filters = [filter];
            }
            // Renderiza a aplicação PixiJS
            app.render();


            // Verifica se o objeto app.view existe
            if (app.view) {
                // Obtém os dados da imagem filtrada em formato base64
                const filteredImageDataURL = app.view.toDataURL();
                // Atualiza o estado com o valor de filteredImageDataURL
                console.log(filteredImageDataURL)
                setFilteredImageDataURL(filteredImageDataURL);
            }



        }
    }




    async function postImage() {

        await api.postImage(urlImg.data.filename, descriptionText);
        handleClose();
    }


    return (
        <div className="containerElement">
            <div className="ContainerImg" ref={containerRef}>
                <img

                    src={urlImg.data.url}
                    alt={`Imagem ${urlImg.index + 1}`}
                />
                <img
                    ref={imageRef} // Usando a ref diretamente no elemento img
                />

            </div>
            <div className="queixoImage">
                <button data-testid="post-button" onClick={() => handleShow()}>
                    <img src={postImgIcon} alt="Post Image" />
                </button>
                <button data-testid="trash-button" onClick={async () => {
                    await api.deleteImage(urlImg.data.filename);
                    userLocal.setUserUpdateData(!userLocal.userUpdateData);
                }}>
                    <img src={trash} alt="Delete Image" />
                </button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Adicione a Descrição</Form.Label>
                            <Form.Control as="textarea" onChange={(event) => setDescriptionText(event.target.value)} rows={3} />
                        </Form.Group>

                        <Form.Group controlId="ControlSelect">
                            <Form.Label>Escolha um filtro</Form.Label>
                            <div className="select-wrapper">
                                <select onChange={(event) => setSelectedFilter(event.target.value)}>
                                    <option value="none">Sem filtro</option>
                                    <option value="brightness">Brilho</option>
                                    <option value="contrast">Contraste</option>
                                    <option value="blackWhite">Preto e Branco</option>
                                </select>
                            </div>
                            {filteredImageDataURL &&
                                //<div className="filtered-image-container">
                                <img src={filteredImageDataURL} alt="Imagem Filtrada" />
                                //</div>

                            }
                        </Form.Group>

                        {//filteredImageDataURL && 
                            //<div className="filtered-image-container">
                            //<img src={filteredImageDataURL} alt="Imagem Filtrada" />
                            //</div>

                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button >
                    <Button variant="primary" onClick={applyFilter}>
                        Aplicar Filtro
                    </Button>
                    <Button variant="primary" onClick={postImage}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default FotosGaleria;
