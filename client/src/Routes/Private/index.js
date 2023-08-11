import React, { useEffect } from "react";
import { useContext, useState, useCallback } from "react";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import AvatarName from "../../Components/AvatarName";
import { Button, Modal, Form, InputGroup, Offcanvas } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { Container, } from 'react-bootstrap';

import './styles.scss'

//toast 
import { toast } from "react-toastify";
import { useApi } from "../../hooks/UseApi";
import UploadImage from "../../Components/UploadImage";
import ImportListImage from "../../Components/ImportListImage";
import EditProfile from "../../Components/EditProfile";

//icons
import pen_edit from "../../icons/pen_edit.svg"
import logout_icon from "../../icons/logout_icon.svg"
import home from "../../icons/home.svg"
import user_icon from "../../icons/user_icon.svg"

import ImportImageProfile from "../../Components/ImportImageProfile";
import UploadImageProfile from "../../Components/UploadImageProfile";
import Pagination from "../../Components/Pagination";
import SearchBar from "../../Components/SearchBar";
import NavigationBar from "../../Components/NavigationBar";


function Register() {

    const userLocal = useContext(UserContext)
    
    const api = useApi();
    //Modal Edit perfil 


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function Modal edit
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');

     const navigate = useNavigate();




    useEffect(() => {

        setFullName(userLocal.user.fullname)
        setUserName(userLocal.user.name)
        setDescription(userLocal.user.description)
        setEmail(userLocal.user.email)
        // toast.success("Ola " + userLocal.user.name + userName)
    }, [])


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

    const handleEditUserName = useCallback(async () => {
        try {
            await api.editUserName(userName);
            toast.success("atualizado " + userName);
            userLocal.setUser({ ...userLocal.user, name: userName })
        } catch (error) {
            toast.warning("erro na atualização");
        }
    }, [userName]);

    const handleEditFullName = useCallback(async () => {
        try {
            await api.editFullName(fullName);
            toast.success("atualizado " + fullName);
            userLocal.setUser({ ...userLocal.user, fullname: fullName })
        } catch (error) {
            toast.warning("erro na atualização");
        }
    }, [fullName]); // Passar como dependência o valor de fullName
    const handleEditDescription = useCallback(async () => {
        try {
            await api.editDescription(description);
            toast.success("atualizado " + description);

            userLocal.setUser({ ...userLocal.user, description: description })
        } catch (error) {
            toast.warning("erro na atualização");
        }
    }, [description]);

    const handleEditEmail = useCallback(async () => {
        try {
            await api.editEmail(email);
            toast.success("atualizado " + email);
            userLocal.setUser({ ...userLocal.user, email: email })
        } catch (error) {
            toast.warning("erro na atualização");
        }
    }, [email]);

    if (!userLocal.user) {
        return (<p>Loading</p>)
    } else {
        return (
            <>
                <div className="cabeçalho">
                    <AvatarName data={userLocal.user} />

                   <NavigationBar page="Perfil"/>

                    <div className="buttons_right">

                        <UploadImage />



                        <Button
                            variant="tp_1"
                            className="w-25  d-flex justify-content-center  align-items-center text-light"
                            type="button"
                            onClick={
                                LogoutButton
                            }
                        >
                            <img src={logout_icon} />
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
                                        <p>Foto de Perfil</p>
                                        <UploadImageProfile />

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
                                                type="email"
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


                                        <p>Password</p>
                                        <InputGroup className="mb-3">

                                            <Form.Control
                                                placeholder={userLocal.user.password}
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                            />
                                            <Button variant="outline-secondary" id="button-addon2">
                                                Button
                                            </Button>


                                        </InputGroup>



                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="tp_1" onClick={handleClose}>
                                            Close
                                        </Button>

                                    </Modal.Footer>
                                </Modal>
                            </>
                            <h5> {userLocal.user.fullname} </h5>
                        </ div>

                        <p> {userLocal.user.description}</p>
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
}

export default Register