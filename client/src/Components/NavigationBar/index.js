import { Button, DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

import home from "../../icons/home.svg"
import user_icon from "../../icons/user_icon.svg"
import logout_icon from "../../icons/logout_icon.svg"
import menu_ from "../../icons/menu_.svg"

import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import "./styles.scss"
import UploadImage from "../UploadImage";
import { useContext } from "react";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; 


function NavigationBar({ page }) {
    const navigate = useNavigate();
    const userLocal = useContext(UserContext)
    function GotoTimeline() {
        navigate('/DashboardPerfil')
    }
    function GotoPerfil() {
        navigate('/Private')
    }
    function GotoTimeLineGeneral() {
        navigate('/TimeLine')
    }
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

    function divButtons() {
        return (
            <>

                <div className="ButtonsCenter">
                    <Button
                        variant={page === "TimeLineGeneral" ? "tp_1" : "transparent"}
                        className="text-light "
                        type="button"
                        onClick={GotoTimeLineGeneral}
                    // disabled
                    >
                        <img src={home}></img>
                        Home
                    </Button>{' '}
                    <Button
                        variant={page === "Perfil" ? "tp_1" : "transparent"}
                        className=" text-light "
                        type="button"
                        onClick={GotoPerfil}
                    >
                        <img src={user_icon}></img>
                        Perfil
                    </Button>{' '}
                    <Button
                        variant={page === "TimeLine" ? "tp_1" : "transparent"}
                        className=" text-light"
                        type="button"
                        onClick={GotoTimeline}
                    >
                        <img src={user_icon}></img>
                        TimeLine
                    </Button>{' '}
                    <SearchBar />
                </div>

                <div className="buttons_right">
                    {/* upload de imagem com condicional */}
                    {page == "Perfil" && <UploadImage />}
                    {/* button sair */}
                    <Button
                        id="LogoutButton"
                        variant="secondary"
                        className="  d-flex justify-content-center  align-items-center text-light"
                        type="button"
                        onClick={
                            LogoutButton
                        }
                    >
                        <img src={logout_icon} />
                        Sair
                    </Button>{' '}
                </div>
            </>
        )
    }

    return (
        <>
            <div className="Smart">
                <DropdownButton
                    as={ButtonGroup}
                    variant="tp_1"
                    title={
                        <>
                            <FontAwesomeIcon icon={faBars} className="mr-2" /> {/* Adding an icon */}
                            
                        </>
                    }
                    id="bg-vertical-dropdown-1"
                    data-bs-theme="dark"
                    
                >
                    {divButtons()}
                    {/* <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item> */}
                </DropdownButton>
            </div>
            <div className="Web">
{divButtons()}
            </div>
            
        </>
    )
}

export default NavigationBar