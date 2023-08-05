import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import './styles.scss'

import { UserContext } from "../../Contexts/Auth/AuthContext";

function FotosDashboard(props) {
    const { user } = useContext(UserContext)
    
    
    const auxData = props;

    return (
        <div className="containerElement">
            <div className="testaImagem">
                
                {/* <AvatarName  propsAvatar = {auxData} /> */}
                <Button >aaa</Button>
            </div>

            <div className="ContainerImg">

               {<img src='https://th.bing.com/th/id/OIP.R0ncVbxDcwIslweprSNdbwHaE7?w=250&h=180&c=7&r=0&o=5&pid=1.7' /> } 

               
               
                
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