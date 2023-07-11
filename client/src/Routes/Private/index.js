import React from "react";
// import { Button } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import AvatarName from "../../Components/AvatarName";
import { Button } from "react-bootstrap";
import { useState } from "react";
import FotosGaleria from "../../Components/FotosGaleria";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import './styles.scss'

//toast 
import { toast } from "react-toastify";
import { useApi } from "../../hooks/UseApi";
import UploadImage from "../../Components/UploadImage";



function Register() {
    const user  = useContext(UserContext)
    const navigate = useNavigate();

    const api = useApi();

    const [userEx, setUserEx] = useState(
        [
            {
                name: user.name,
                token: user.token,
                image: 'https://th.bing.com/th/id/OIP.wJHORvBaGvZsOuEL6oP4tQHaE5?w=170&h=180&c=7&r=0&o=5&pid=1.7',
                description: 'toca de mais papai'
            }
            //,
            // {
            //     name: 'Dj Juninho',
            //     token: '05',
            //     image: 'https://th.bing.com/th/id/OIP.wJHORvBaGvZsOuEL6oP4tQHaE5?w=170&h=180&c=7&r=0&o=5&pid=1.7',
            //     description: 'toca de mais papai'
            // }
        ]

    );

    async function LogoutButton() {
        const logoutCont = await user.logout();

        if (logoutCont) {
            toast.success("Deslogado!");
            navigate("/");
        } else {
            toast.danger("Deslogado!");
        }
    }


    // 
    return (
        <>
            <div className="cabeçalho">
                <AvatarName data={userEx} />
                {/* implementar um input para testart o pupUp */}
                {/* <ToatsFlutuante mensagem="Testando os parametros" cor="yellow" /> */}



                <div className="buttons_right">
                    {/* <Button> Adicionar Midia </Button> */}
                    <UploadImage/>


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
                {userEx.map((user, index) => (
                    <div key={index}>
                        <p>Description: {user.description}</p>
                    </div>
                ))}
                {/* <p>{userEx.description}</p> */}
            </div>

            <div className="Arquivos">
                <Container >
                    <Row>
                        <Col><FotosGaleria /></Col>
                        <Col><FotosGaleria /></Col>
                        <Col><FotosGaleria /></Col>

                        <Col><FotosGaleria /></Col>
                        <Col><FotosGaleria /></Col>
                        <Col><FotosGaleria /></Col>

                        <Col><FotosGaleria /></Col>
                        <Col><FotosGaleria /></Col>
                        <Col><FotosGaleria /></Col>
                    </Row>
                </Container >
            </div>

            {/* <h2>
                Teste Privado
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.token}</p>
                <p>{user.password}</p>
                <NavLink to="/" id="NavLinkExit" activeClassName="active" >
                    <Button variant="primary" className="w-100 " >
                        Sair
                    </Button>{' '}
                </NavLink>
            </h2> */}
        </>
    )
}

export default Register