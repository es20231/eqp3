import React, { useEffect } from "react";
import { useContext,} from "react";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import AvatarName from "../../Components/AvatarName";
import { Button,  } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { Container, } from 'react-bootstrap';

import './styles.scss'

//toast 
import { toast } from "react-toastify";

//icons

import logout_icon from "../../icons/logout_icon.svg"

import ImportListDashboardImage from "../../Components/ImportListDashboardImage";
import NavigationBar from "../../Components/NavigationBar";


function DashboardPerfil() {

    const userLocal = useContext(UserContext)
    const navigate = useNavigate();



    async function LogoutButton() {
        // apagando token user 

        const logoutCont = await userLocal.logout();
       

        if (logoutCont) {
            toast.success("Deslogado!");
            navigate("/");
        } else {
            toast.warning("Deslogado!");
            navigate("/");
        }
    }

    if (!userLocal.user) {
        return (<p>Loading</p>)
    } else {
        return (
            <>
                <div className="cabeçalho">
                    <AvatarName data={userLocal.user} />

                    <NavigationBar page="TimeLine" />

                   
                </div>



                <div className="Descrição" >

                    <div className="textBox" >
                        <div className="edit_perfil_name">
                         
                            <h5> {userLocal.user.fullname} </h5>
                        </ div>

                        <p> {userLocal.user.description}</p>
                    </div>


                </div>

                <div className="Arquivos">
                    <Container >
                        {/* <ImportImage/> */}
                        <ImportListDashboardImage sendToDashBoardImage={true} userNameDash={userLocal.user.username}/>


                    </Container >

                </div>
            </>
        )
    }
}

export default DashboardPerfil;