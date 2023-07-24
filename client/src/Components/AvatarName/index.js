import React from "react";
import "./styles.scss"


function AvatarName(
    props
    //array contendo imagem e nome
) {
    return (
        <div className="Perfil01">
           
            <div className="ConjuntoFotoNome" >
                {<img id="ImgAvatar" src={props.data.image} /> || null}
                <p>{props.data.name}</p>
            </div>
        </div>
    )
}

export default AvatarName;