import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import './styles.scss'

import { UserContext } from "../../Contexts/Auth/AuthContext";

function FotosDashboard(urlImg) {
    const { user } = useContext(UserContext)
    

    return (
        <div className="containerElement">
            <div className="testaImagem">
                
                {/* <AvatarName  propsAvatar = {auxData} /> */}
                
                <Button >...</Button>
            </div>

            <div className="ContainerImg">

            
            <img src={urlImg.data.url} alt={`Imagem ${urlImg.index + 1}`} />
               
               
                
            </div>
            <div className="queixoImage">
                <button>
                    {/* <img src={postImgIcon} /> */}
                </button>
                <button>
                    {/* <img src={trash} /> */}
                </button>
            </div>
        </div>
    );
}

export default FotosDashboard;