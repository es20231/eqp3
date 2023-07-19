import React from "react";
import "./styles.scss"


function AvatarName(
    props
    //array contendo imagem e nome

) {
    return (
        <div className= "perfil01">
            {props.data.map((userEx, index) => (
                <div className="conjuntoFotoNome" key={index}>
                    <img id="imgAvatar" src={userEx.image} alt="Avatar" />
                    <p>{userEx.name}</p>
                </div>
            ))}

        </div>
    )
}

export default AvatarName;