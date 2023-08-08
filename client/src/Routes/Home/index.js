import React, { useContext, useState } from "react";
import './styles.scss';
import { Button,Container,FloatingLabel,Form } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import icon_user  from '../../icons/user_icon.svg'
import icon_login  from '../../icons/login_icon.svg'
// import Navbar1 from "../../Components/Header";

//Api

import { toast } from "react-toastify";
import { UserContext } from "../../Contexts/Auth/AuthContext";

function Home() {

    const navigate = useNavigate();
    function GotoRegister(){
        navigate('/Register')
    }
    const userLocal = useContext(UserContext);

    const [dataTemp, setDataTemp] = useState(
        {
            userName: '',
            password: '',
        }
    );

    async function loginSubmit() {

        const dataLogin = await userLocal.login(dataTemp.userName, dataTemp.password);


        if (dataLogin) {
            if (dataLogin.status == 200) {
                toast.success("login ok")

            }
        } else {
            toast.error("dados errados")
        }

    }

    return (<>
        {/* <Navbar1/> */}
        <div className="Home">
            <Container className="DivLeftH "     >
                <h1>Teste</h1>

            </Container>
            <div className=" DivRightH">
                <div className="BackgraundFormulario">
                    <Form
                        className="FormularioInicial"
                        onSubmit={(e) => {
                            e.preventDefault();
                            loginSubmit();
                        }}
                    >
                        {/* imagem da Logo*/}


                        <Button variant="tp_2" className="w-full d-flex justify-content-center  align-items-center text-light" onClick={GotoRegister} >
                            <img src={icon_user}/>
                            Criar Conta
                            </Button>{' '}


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
                            variant="tp_1"
                            className="w-100 "
                            type="submit"
                            controlId="buttonEntrar"
                        >
                            <img src={icon_login}/>
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