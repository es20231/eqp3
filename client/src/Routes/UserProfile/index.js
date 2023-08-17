import React, { useEffect } from "react";
import { useContext, useState, useCallback } from "react";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import AvatarName from "../../Components/AvatarName";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Container, } from 'react-bootstrap';

// import './styles.scss'

//toast 
import { toast } from "react-toastify";

import logout_icon from "../../icons/logout_icon.svg"

import ImportListDashboardImage from "../../Components/ImportListDashboardImage";
import NavigationBar from "../../Components/NavigationBar";
import { useApi } from "../../hooks/UseApi";


function UserProfile() {

    const api = useApi()
    // recebe o nome do usurário pela props 

    // busca a 
    const { username } = useParams();

    const [userProfile, setUserProfile] = useState([])
    

    // criar uma estrutura para com os dados do usuario

    useEffect(() => {
        const importDataUser = async () => {
            const dataUser = await api.ImportDataUserProfile(username)
            setUserProfile(userProfile => dataUser.data)
           

        }
          // importImagensApi();
        importDataUser();
    }, [username])

    useEffect(() => {
        console.log("####-- PERFIL PROFILE --### ");
        console.log(userProfile);
    }, [userProfile]);

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

    

    if (!userProfile) {
        return (<p>Loading</p>)
    } else {
        return (
            <>
                <div className="cabeçalho">
                  
                    {userProfile.profile_picture && userProfile.username && <AvatarName key={userProfile.id}  data={ userProfile } />}

                    <NavigationBar page="user" />

                    <div className="buttons_right">

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

                            {<h5> {userProfile.fullname} </h5>}
                        </ div>

                        {<p> {userProfile.description}</p>}
                    </div>


                </div>

                <div className="Arquivos">
                    <Container >
                        {/* <ImportImage/> */}

                        <ImportListDashboardImage userNameDash={username} />

                    </Container >

                </div>
            </>
        )
    }
}

export default UserProfile;