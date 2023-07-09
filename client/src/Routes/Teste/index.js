import React from "react";
// import './styles.scss'
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom"
import ToatsFlutuante from "../../Components/Toats";

// // import Navbar1 from "../../Components/Header";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// window.addEventListener("load", ToatsFlutuante);


function Alerta() {
    return (<>
        {/* <Navbar1/> */}
        <div className="Home">
            <div className=" DivLeft">
                <h1>Nao possui Token</h1>
                <ToatsFlutuante mensagem="Testando os parametros" cor="green"/>
            </div>
            <div className=" DivRight">

                <NavLink to="/" id="NavLinkExit" activeClassName="active" >
                    <Button variant="primary" className="w-100 " >
                        Sair
                    </Button>{' '}
                </NavLink>

                
            </div>
        </div>
    </>
    )

}

export default Alerta;