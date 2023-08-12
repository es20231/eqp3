import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useApi } from "../../hooks/UseApi";

function AvatarName(props) {
    const api = useApi();

    const [auxProps, setAuxProps] = useState(props.data);

    useEffect(() => {
        const isBlobURL = (inputString) => {
            const blobPattern = /^blob:/;
            return blobPattern.test(inputString);
        };

        const importImages = async () => {
        

            if (!isBlobURL(auxProps.profile_picture)) {
                try {
                   if(auxProps.profile_picture){
                     const importedImage = await api.importImage(auxProps.profile_picture);
                    setAuxProps((prevProps) => ({ ...prevProps, profile_picture: importedImage }));}
                } catch (error) {
                    console.error("Erro ao importar imagem:", error);
                }
            } 
        };

        importImages();
    }, [ props]);

    return (
        <div className="Perfil01">
            <div className="ConjuntoFotoNome">
                {auxProps.profile_picture && <img id="ImgAvatar" src={auxProps.profile_picture} />}
                <p>{auxProps.username}</p>
            </div>
        </div>
    );
}

export default AvatarName;
