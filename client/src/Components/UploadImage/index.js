import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import { toast } from "react-toastify";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import image_plus_icon from "../../icons/image_plus_icon.svg"

function UploadImage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]); // Alterado para array de imagens
    const [fileImages, setFileImages] = useState([]); // Alterado para array de arquivos
    const api = useApi();
    const userLocal = useContext(UserContext);

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const newSelectedImages = newFiles.map(file => URL.createObjectURL(file));

            setSelectedImages(prevImages => [...prevImages, ...newSelectedImages]);
            setFileImages(prevFiles => [...prevFiles, ...newFiles]);
        }
    };

    const handleSubmit = async () => {
        if (selectedImages.length > 0) {
            const formData = new FormData();

            fileImages.forEach(file => {
                // console.log("test-------- file")
                // console.log(file)
                formData.append('file', file);
                // console.log(formData);
                // {
                //     for (let pair of formData.entries()) {
                //         console.log(pair[0] + ':', pair[1]);
                //     }
                // }

            });

            await api.uploadImage(formData);
            userLocal.setUserUpdateData(!userLocal.userUpdateData);
            toast.success("Imagens enviadas com sucesso!");
            handleClose();
        } else {
            toast.warning("Por favor, selecione pelo menos uma imagem!");
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedImages([]);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    return (
        <>
            <Button variant="tp_2 text-light border-0 bg-transparent" onClick={handleShow}>
                <img src={image_plus_icon} alt="Adicionar Imagem" />
            </Button>

            <Modal show={showModal} onHide={handleClose} dialogClassName="custom-dialog" contentClassName="custom-content" backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione a(s) Imagem(ns)</Modal.Title>
                </Modal.Header>
                <Modal.Body className="divImageUpload">
                    {selectedImages.map((image, index) => (
                        <img key={index} src={image} alt={`Imagem ${index}`} />
                    ))}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
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
