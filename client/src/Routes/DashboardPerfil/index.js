import React from "react";
// import { Button } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import AvatarName from "../../Components/AvatarName";
import { Button } from "react-bootstrap";
import { useState } from "react";
import FotosDashboard from "../../Components/FotosDashboard";

import { NavLink } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import './styles.scss'

//toast 
import { toast } from "react-toastify";

//function toastify

const Button_toast = () => {
    toast.success("Mensagem de sucesso");
};

function DashboardPerfil() {
    const { user } = useContext(UserContext)

    const [userEx, setUserEx] = useState(
        [
            //     {
            //     name: 'Banda Djavu',
            //     token: '02',
            //     image: 'https://th.bing.com/th/id/OIP.j1UJHkcjkF0_Eu6JwPktKwHaHa?w=170&h=180&c=7&r=0&o=5&pid=1.7'

            // },
            {
                name: 'Dj Juninho',
                token: '05',
                image: 'https://th.bing.com/th/id/OIP.wJHORvBaGvZsOuEL6oP4tQHaE5?w=170&h=180&c=7&r=0&o=5&pid=1.7',
                description: 'toca de mais papai'
            }
        ]

    );


    // 
    return (
        <>
            <div className="cabeçalho">
                <AvatarName data={userEx} />
                {/* implementar um input para testart o pupUp */}
                {/* <ToatsFlutuante mensagem="Testando os parametros" cor="yellow" /> */}

                <Button onClick={Button_toast}>Notify !</Button>

                <div className="buttons_right">
                    <Button> Adicionar Midia </Button>



                    <NavLink to="/" activeClassName="active" className="d-block">
                        <Button variant="primary" className="w-100 " >Sair</Button>{' '}
                    </NavLink>

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
                        <Col><FotosDashboard userEx = {userEx} /></Col>
                        <Col><FotosDashboard /></Col>
                        <Col><FotosDashboard /></Col>

                        <Col><FotosDashboard /></Col>
                        <Col><FotosDashboard /></Col>
                        <Col><FotosDashboard /></Col>

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

export default DashboardPerfil;
