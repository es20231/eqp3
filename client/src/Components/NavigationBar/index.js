import { Button } from "react-bootstrap";

import home from "../../icons/home.svg"
import user_icon from "../../icons/user_icon.svg"

import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import "./styles.scss"


function NavigationBar({ page }) {
    const navigate = useNavigate();
    function GotoTimeline() {
        navigate('/DashboardPerfil')
    }
    function GotoPerfil() {
        navigate('/Private')
    }
    return (<>
        <Button
            variant={page === "Home" ? "tp_1" : "transparent"}
            className="text-light "
            type="button"
            
            disabled
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
    </>)
}

export default NavigationBar