import React from "react";
import "./styles.scss"


function AvatarName(
    props
    //array contendo imagem e nome
) {
    return (
        <div className="Perfil01">
           
            <div className="ConjuntoFotoNome" >
                {<img id="ImgAvatar" src={props.data.profile_picture} /> || null }
                {console.log(props)}
                <p>{props.data.username}</p>
            </div>
        </div>
    )
}

export default AvatarName;