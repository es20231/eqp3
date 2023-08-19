import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./styles.scss";
import { useApi } from "../../hooks/UseApi";
import { toast } from "react-toastify";
import { UserContext } from "../../Contexts/Auth/AuthContext";


import perfil_avatar from "../../icons/perfil_avatar_icon_.svg"

function UploadImageProfile() {
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


            //existe algum erro na compatibilidade do arquivo a ser enviado para a API
            await api.uploadImageProfile(formData);
            setTimeout(userLocal.setUserUpdateData(!userLocal.userUpdateData), 200);
            // indicar que esta atualizando

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
            <Button variant="tp_2 text-light" onClick={handleShow}>
                <img src={perfil_avatar} />

                Perfil
            </Button>

            <Modal
                show={showModal}
                onHide={handleClose}
                dialogClassName="custom-dialog"
                contentClassName="custom-content"
                backdrop="static"
                keyboard={false}>
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
                    <Button variant="tp_1" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="tp_2" onClick={handleSubmit}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UploadImageProfile;
