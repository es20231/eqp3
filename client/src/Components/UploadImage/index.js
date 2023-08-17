import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import "./styles.scss";
import { useApi } from "../../hooks/UseApi";
import { toast } from "react-toastify";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import image_plus_icon from "../../icons/image_plus_icon.svg"


function UploadImage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileImage, setFileImage] = useState('');
    const api = useApi();
    const userLocal = useContext(UserContext);

    const handleChange = (e) => {
        e.preventDefault();
        // test sync
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
            setFileImage(file);
        }
    };


    const handleSubmit = async () => {
        if (selectedImage) {
            //chamada da função

            const formData = new FormData(); // Cria um objeto FormData
            formData.append('file', fileImage);
            // formData.append('user_id',userLocal.user.token);

            // console.log(formData);
            // {
            //     for (let pair of formData.entries()) {
            //         console.log(pair[0] + ':', pair[1]);
            //     }
            // }
            //existe algum erro na compatibilidade do arquivo a ser enviado para a API
            await api.uploadImage(formData); //, userLocal.user.token
            userLocal.setUserUpdateData(!userLocal.userUpdateData) // indicar que esta atualizando
            toast.success("Imagem enviada com sucesso!");
            handleClose();
        } else {
            toast.warning("Por favor, selecione uma imagem!");
        }
    };

    // upload image
    const handleClose = () => {
        setShowModal(false);
        setSelectedImage(null);

    };

    const handleShow = () => {
        setShowModal(true);
    };

    return (
        <>
            <Button variant="tp_2 text-light border-0 bg-transparent" onClick={handleShow}>
                <img src={image_plus_icon} />
                 {/* <img src={logo}/> */}
            </Button>

            <Modal show={showModal} onHide={handleClose} dialogClassName="custom-dialog" contentClassName="custom-content" backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione a Imagem</Modal.Title>
                </Modal.Header>
                <Modal.Body className="divImageUpload">
                    {selectedImage && <img src={selectedImage} alt="Imagem selecionada" />}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>

                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UploadImage;
