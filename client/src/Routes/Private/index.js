import React from "react";
import { useContext, useState, useCallback } from "react";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import AvatarName from "../../Components/AvatarName";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { Container, } from 'react-bootstrap';

import './styles.scss'

//toast 
import { toast } from "react-toastify";
import { useApi } from "../../hooks/UseApi";
import UploadImage from "../../Components/UploadImage";
import ImportListImage from "../../Components/ImportListImage";

//icons
import pen_edit from "../../icons/pen_edit.svg"


function Register() {
    const userLocal = useContext(UserContext)
    const navigate = useNavigate();
    const api = useApi();


    async function LogoutButton() {
        // apagando token user 

        const logoutCont = await userLocal.logout();
        console.log(logoutCont)

        if (logoutCont) {
            toast.success("Deslogado!");
            navigate("/");
        } else {
            toast.warning("Deslogado!");
            navigate("/");
        }
    }

    //Modal Edit perfil 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function Modal edit
    const [fullName, setFullName] = useState(userLocal.user.fullname);
    const [userName, setUserName] = useState(userLocal.user.name);
    const [description, setDescription] = useState(userLocal.user.description);
    const [email, setEmail] = useState(userLocal.user.email);

    const handleEditUserName = useCallback(async () => {
        try {
            await api.editUserName(userName);
            toast.success("atualizado " + userName);
        } catch (error) {
            toast.warning("erro na atualização");
        }
    }, [userName]);

    const handleEditFullName = useCallback(async () => {
        try {
            await api.editFullName(fullName);
            toast.success("atualizado " + fullName);

        } catch (error) {
            toast.warning("erro na atualização");
        }
    }, [fullName]); // Passar como dependência o valor de fullName
    const handleEditDescription = useCallback(async () => {
        try {
            await api.editDescription(description);
            toast.success("atualizado " + description);

        } catch (error) {
            toast.warning("erro na atualização");
        }
    }, [description]);

    const handleEditEmail = useCallback(async () => {
        try {
            await api.editEmail(email);
            toast.success("atualizado " + email);

        } catch (error) {
            toast.warning("erro na atualização");
        }
    }, [email]);

    return (
        <>
            <div className="cabeçalho">
                <AvatarName data={userLocal.user} />



                <div className="buttons_right">
                    {/* <Button> Adicionar Midia </Button> */}
                    <UploadImage />


                    {/* <Button type="button" onClick={ImportListImagens}> import lista images </Button> */}
                    {/* <img src={ImportImagens} >exibir</img> */}
                    <Button
                        variant="primary"
                        className="w-70"
                        type="button"
                        onClick={
                            LogoutButton
                        }
                    >
                        Sair
                    </Button>{' '}

                </div>
            </div>



            <div className="Descrição" >

                <div className="textBox" >
                    <div className="edit_perfil_name">
                        {/* Edit Button */}
                        <>

                            <button variant="primary" onClick={handleShow}>
                                <img src={pen_edit}></img>
                                Edit 
                            </button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Perfil do Usuario</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <p>User Name</p>
                                    <InputGroup className="mb-3">

                                        <Form.Control
                                            placeholder={userLocal.user.name}
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}

                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={handleEditUserName}>
                                            Button
                                        </Button>


                                    </InputGroup>

                                    <p>Full Name</p>
                                    <InputGroup className="mb-3">

                                        <Form.Control
                                            placeholder={userLocal.user.fullname}
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}

                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={handleEditFullName}>
                                            Button
                                        </Button>


                                    </InputGroup>


                                    <p>Description</p>
                                    <InputGroup className="mb-3">

                                        <Form.Control
                                            placeholder={userLocal.user.description}
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}

                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={handleEditDescription}>
                                            Button
                                        </Button>
                                    </InputGroup>

                                    <p>Email</p>

                                    <InputGroup className="mb-3">

                                        <Form.Control
                                            placeholder={userLocal.user.email}
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}

                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={handleEditEmail}>
                                            Button
                                        </Button>
                                    </InputGroup>


                                    {/* <p>Password</p>
                            <InputGroup className="mb-3">

                                <Form.Control
                                    placeholder={userLocal.user.password}
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    Button
                                </Button>


                            </InputGroup> */}



                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    {/* <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button> */}
                                </Modal.Footer>
                            </Modal>
                        </>
                        <h5> {userLocal.user.fullname} </h5>
                    </ div>

                    <p>Description: {userLocal.user.description}</p>
                </div>


            </div>

            <div className="Arquivos">
                <Container >
                    {/* <ImportImage/> */}
                    <ImportListImage />
                </Container >
            </div>
        </>
    )
}

export default Register