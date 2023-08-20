import React, { useContext, useEffect, useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import './styles.scss';
import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';
import { useApi } from "../../hooks/UseApi";
import { UserContext } from "../../Contexts/Auth/AuthContext";


function FotosGaleria(urlImg) {
    const api = useApi();
    const userLocal = useContext(UserContext);
    const [descriptionText, setDescriptionText] = useState('');
    const [show, setShow] = useState(false);
    const [selectedFilter,setSelectedFilter] = useState('none');//Filtro selecionado
    const [imagemEditada, setImagemEditada] = useState(null);//Armazenar imagem editada



    const handleClose = () => setShow(false);
    const handleShow = () => { setSelectedFilter('none'); 
                                setShow(true)};

    const imageFilterRef = useRef(null);//Cirar uma referência


  

    async function applyFilter() {
        const elementoImagem = imageFilterRef.current;
        if (elementoImagem) {
            elementoImagem.classList.remove('none', 'duotone', 'invert', 'grayscale'); // Remove todas as classes de filtro existentes para limpar filtros anteriores
            elementoImagem.classList.add(selectedFilter);// Adiciona a classe correspondente ao filtro selecionado

    
            // Obter a imagem editada em base64
            const imagemEditadaBase64 = await obterBase64DaImagem(elementoImagem);
           console.log(imagemEditadaBase64)//Enviar para o banco de dados
           setImagemEditada(imagemEditadaBase64); // Armazena a imagem editada

        }
        //handleClose();

    }
    async function obterBase64DaImagem(elementoImagem) {//Converte a imagem em um formato de dados basae64
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');//Cria um canvas com mesma altura e largura da imagem 
            canvas.width = elementoImagem.width;
            canvas.height = elementoImagem.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(elementoImagem, 0, 0);
    
            canvas.toBlob((blob) => {//Converte o conteúdo do canvas em um objeto binário grande
                const leitor = new FileReader();//Le o blob e transformar em um formato base64
                leitor.onload = () => resolve(leitor.result);
                leitor.readAsDataURL(blob);
            });
        });
    }
        
          
    async function postImage() {
        
        const formData = new FormData();
        formData.append('file.url',imagemEditada);//Imagem no formato base64
        formData.append('file.name',urlImg.data.filename);//nome da imagem

        //formData.append('description', descriptionText);


        //const aplicandoFiltro = urlImg.data.filename
        
        await api.postImage(urlImg.data.filename, descriptionText);//Enviar esse arquivo ja editado

        handleClose();
    }


    return (
        <div className="containerElement">
            <div className="ContainerImg">
                <img
                    src={urlImg.data.url}
                    alt={`Imagem ${urlImg.index + 1}`}
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
                                <select onChange={ (event) => setSelectedFilter(event.target.value)}>
                                    <option value="none">Sem filtro</option>
                                    <option value="sepia">Sepia</option>
                                    <option value="invert">Invert</option>
                                    <option value="grayscale">Grayscale</option>
                                </select>
                            </div>
                
                     <div className={`ContainerFiltro ${selectedFilter}`}>
                        <img
                            ref={imageFilterRef}
                            src={urlImg.data.url}
                            alt={`Imagem ${urlImg.index + 1}`}
                            style={{maxWidth: '250px',maxHeight: '200px'}}
                        />
                    </div>
            
                     
 
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close+
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
export default FotosGaleria
