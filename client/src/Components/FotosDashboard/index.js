import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import './styles.scss'
import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';
import AvatarName from "../AvatarName";
import { UserContext } from "../../Contexts/Auth/AuthContext";

function FotosDashboard(props) {
    const { user } = useContext(UserContext)
    // passar os dados do usuario aqui 
    // const [userEx, setUserEx] = useState(
    //     [
    //         //     {
    //         //     name: 'Banda Djavu',
    //         //     token: '02',
    //         //     image: 'https://th.bing.com/th/id/OIP.j1UJHkcjkF0_Eu6JwPktKwHaHa?w=170&h=180&c=7&r=0&o=5&pid=1.7'

    //         // },
    //         {
    //             name: 'Dj Juninho',
    //             token: '05',
    //             image: 'https://th.bing.com/th/id/OIP.wJHORvBaGvZsOuEL6oP4tQHaE5?w=170&h=180&c=7&r=0&o=5&pid=1.7',
    //             description: 'toca de mais papai'
    //         }
    //     ]

    // );
    
    const auxData = props;

    return (
        <div className="containerElement">
            <div className="testaImagem">
                
                {/* <AvatarName  propsAvatar = {auxData} /> */}
                <Button >aaa</Button>
            </div>

            <div className="ContainerImg">

                <img src='https://th.bing.com/th/id/OIP.R0ncVbxDcwIslweprSNdbwHaE7?w=250&h=180&c=7&r=0&o=5&pid=1.7' />
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