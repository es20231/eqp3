import React, { useState } from "react";
import './styles.scss'
import { Button, Toast } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom"

import { UserContext } from "../../Contexts/Auth/AuthContext";
import { useContext } from "react";

// import Navbar1 from "../../Components/Header";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

//Api
import { useApi } from "../../hooks/UseApi";
import { toast } from "react-toastify";

function Home() {
    const navigate = useNavigate();

    const api = useApi();
    const user = useContext(UserContext)
    //  const navigate = useNavigate()
    const [dataTemp, setDataTemp] = useState(
        {
            userName: '',
            password: '',
        }
    );

       //verificar se o usuário ja esta logado 

    const isLogged = async () => {
        if (dataTemp.userName && dataTemp.password) {
            // console.log(dataTemp);
            const isLogged = await user.login(dataTemp.userName, dataTemp.password);
            // console.log(isLogged);

            if (isLogged) {

                console.log(isLogged);
                // toast.success("Ja esta logado")
                navigate('/Private')
            } else {
                toast.warning("necessário fazer um login")
                // console.log("erro no login")
            }

        }
    }

    // async function loginSubmit() {

    //     const dataLogin = await api.login(dataTemp.userName, dataTemp.password);

    //     console.log(dataLogin)
    //     if (dataLogin) {
    //         if (dataLogin.status == 200) {
    //             toast.success("login ok")
    //             navigate("/private");

    //         } else {
    //             toast.error("dados errados")
    //         }
    //     }else {
    //         toast.error("dados errados")
    //     }

    // }

    return (<>
        {/* <Navbar1/> */}
        <div className="Home">
            <div className=" DivLeft">
                <h1>Teste</h1>

            </div>
            <div className=" DivRight">
                <div className="backgraundFormulario">
                    <Form
                        className="FormularioInicial"
                        onSubmit={(e) => {
                            e.preventDefault();
                            isLogged();
                        }}
                    >
                        {/* imagem da Logo*/}

                        <NavLink to="/Register" activeClassName="active" className="d-block">
                            <Button variant="primary" className="w-100 " >Criar Conta</Button>{' '}
                        </NavLink>

                        {/* Divisoria */}
                        <FloatingLabel controlId="floatingInput" label="Name User" className="mb-2">
                            <Form.Control
                                type="name"
                                placeholder="Name"
                                value={dataTemp.userName}
                                onChange={e => setDataTemp({ ...dataTemp, userName: e.target.value })} />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={dataTemp.password}
                                onChange={e => setDataTemp({ ...dataTemp, password: e.target.value })}
                            />

                        </FloatingLabel>

                        <Button
                            variant="primary"
                            className="w-100 "
                            type="submit"
                        >
                            Entrar
                        </Button>{' '}


                    </Form>
                </div>
            </div>
        </div>
    </>
    )

}

export default Home;