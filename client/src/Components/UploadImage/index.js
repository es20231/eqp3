import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./styles.scss";
import { useApi } from "../../hooks/UseApi";
import { toast } from "react-toastify";
import { UserContext } from "../../Contexts/Auth/AuthContext";

function UploadImage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileImage, setFileImage] = useState('');
    const api = useApi();
    const userLocal = useContext(UserContext);

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
            setFileImage(...fileImage, file);
        }
    };

    const handleSubmit = async () => {
        if (selectedImage) {
            //chamada da função
            const formData = new FormData(); // Cria um objeto FormData

            formData.append('file', fileImage);
            formData.append('name', "fileImage_Name");

            console.log(formData);
            {for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
              }}
            //existe algum erro na compatibilidade do arquivo a ser enviado para a API
            await api.UploadImage(formData, userLocal.user.token);

            toast.success("Imagem enviada com sucesso!");
            handleClose();
        } else {
            toast.warning("Por favor, selecione uma imagem!");
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Upload imagem
            </Button>

            <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
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