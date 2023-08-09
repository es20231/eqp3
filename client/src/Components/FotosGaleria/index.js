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
import React, { useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import './styles.scss';
import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';
import { useApi } from "../../hooks/UseApi";
import { UserContext } from "../../Contexts/Auth/AuthContext";

function FotosGaleria( urlImg ) {
    const api = useApi();
    const userLocal = useContext(UserContext);
    const [descriptionText, setDescriptionText] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function postImage() {
        await api.postImage(urlImg.data.filename, descriptionText);
        handleClose();
    }

    return (
        <div className="containerElement">
            <div className="ContainerImg">
                <img src={urlImg.data.url} alt={`Imagem ${urlImg.index + 1}`} />
            </div>
            <div className="queixoImage">
                <button onClick={() => handleShow()}>
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
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
