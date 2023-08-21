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
import ImportListTimeLine from "../../Components/ImportListTimeLine";


function TimeLine() {

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
                <div style={{position:'fixed',zIndex:999}} className="cabeçalho">
                    <AvatarName data={userLocal.user} />

                    <NavigationBar page="TimeLineGeneral" />

                    
                </div>

                <div style={{height: '100px'}}> className="NavBarSpace"</div>



                <div className="Arquivos">
                    <Container >
                        {/* <ImportImage/> */}
                        <ImportListTimeLine />


                    </Container >

                </div>
            </>
        )
    }
}

export default TimeLine;