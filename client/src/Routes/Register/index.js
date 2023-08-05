import React, { useState } from "react";
import './styles.scss'
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom"


// import Navbar1 from "../../Components/Header";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

//Api
import { useApi } from "../../hooks/UseApi";
import { toast } from "react-toastify";

import icon_cadastrar from "../../icons/cadastrar_icon.svg"
import logout_icon from "../../icons/logout_icon.svg"

function Register() {
    const [username, setName] = useState('');
    const [fullname, setNameCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //chamda da API
    const api = useApi();

    const navigate = useNavigate();
    //testando a integração do axios com o BD
    async function EnviarPost() {
        //salvando input 


        const data = await api.register(username, fullname, email, password)
        if (data) {
            //se recebeu 200 

            toast.success("cadastro enviado")
            console.log(data);

            navigate("/");

        }
        else {
            //se for diferente  200
            toast.warning("erro ao enviar cadastro ")

        }
    }

    // Criar a regra para verificar se o password são iguais

    return (<>
        {/* <Navbar1/> */}
        <div className="Register">
            <div className=" DivLeft">
                <h1>Teste</h1>

            </div>
            <div className=" DivRight">

                <NavLink to="/" id="NavLinkExit" activeclassname="active" >
                    <Button variant="tp_2" className="w-100 d-flex justify-content-center  align-items-center text-light" >
                        <img src={logout_icon} />
                        Sair
                    </Button>{' '}
                </NavLink>

                <div className="backgraundFormulario">
                    <Form
                        className="FormularioInicial"
                        onSubmit={(e) => {
                            e.preventDefault();
                            EnviarPost();
                        }}
                    >
                        {/* imagem da Logo*/}
                        {/* <Button variant="primary">Criar Conta</Button>{' '} */}
                        {/* Divisoria */}
                        <FloatingLabel controlId="floatingInput" label="User" className="mb-2" >
                            <Form.Control
                                type="text"
                                placeholder="User123"
                                value={username}
                                onChange={e => setName(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingInput" label="User_Full_Name" className="mb-2" >
                            <Form.Control
                                type="text"
                                placeholder="UserOliveira"
                                value={fullname}
                                onChange={e => setNameCompleto(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-2">
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FloatingLabel>

                        {/* <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </FloatingLabel> */}
                        {/* verificar o layout */}
                        <Button
                            variant="tp_1"
                            type="submit"
                            className="text-light"
                        >

                            <img src={icon_cadastrar} />
                            Cadastrar
                        </Button>{' '}
                    </Form>
                </div>
            </div>
        </div>
    </>
    )

}

export default Register;