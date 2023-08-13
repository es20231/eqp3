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
import React, { useContext, useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import './styles.scss';
import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';
import { useApi } from "../../hooks/UseApi";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import Caman from "caman"
// import * as PIXI from 'pixi.js';


function FotosGaleria( urlImg ) {
    const api = useApi();
    const userLocal = useContext(UserContext);
    const [descriptionText, setDescriptionText] = useState('');
    const [show, setShow] = useState(false);
    const [selectedFilter,setSelectedFilter] = useState('none')


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function postImage() {
        await api.postImage(urlImg.data.filename, descriptionText);
        handleClose();
    }
    const src="https://cdnjs.cloudflare.com/ajax/libs/camanjs/4.1.2/caman.full.min.js"

    async function applyfilter(){
        if (imageRef.current){
            Caman(imageRef.current, function () {
                        // Aplicar o filtro escolhido
                        if (selectedFilter === "brightness") {
                            this.brightness(10);
                        } else if (selectedFilter === "contrast") {
                            this.contrast(10);
                        }
                        else if (selectedFilter==="blackWhite"){
                            this.greyscale();
                        }
                        this.render();


                    });
                }

                //Salvar a imagem
    }

   

    const imageRef= useRef(null)//Referencia para o elemento <img>



   

    


    return (
        <div className="containerElement">
            <div className="ContainerImg">
                <img 
                ref={imageRef}
                src={urlImg.data.url} 
                alt={`Imagem ${urlImg.index + 1}`} />
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
                            <Form.Control as="select" onChange={(event) => setSelectedFilter(event.target.value)}>
                                <option value="none">Nenhum</option>
                                <option value="brightness">Brilho</option>
                                <option value="contrast">Contraste</option>
                                <option value= "blackWhite">Preto e Branco </option>

                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button >
                    <Button variant="" onClick={applyfilter}>
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
