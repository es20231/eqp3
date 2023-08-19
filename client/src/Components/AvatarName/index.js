import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useApi } from "../../hooks/UseApi";
import user_icon from "../../icons/user_icon.svg";
import { Link } from "react-router-dom";

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
                    if (auxProps.profile_picture) {
                        const importedImage = await api.importImage(auxProps.profile_picture);
                        setAuxProps((prevProps) => ({ ...prevProps, profile_picture: importedImage }));
                    }
                } catch (error) {
                    console.error("Erro ao importar imagem:", error);
                }
            }
        };

        importImages();
    }, [props]);

    const avatarStyle = {
        height: props.tam ? `${props.tam + 2}px` : "82",
    };

    const imageStyle = {
        height: props.tam ? `${props.tam}px` : "82",
        width: props.tam ? `${props.tam}px` : "82",
    };

    const nameStyle = {
        fontSize: props.tamFont ? `${props.tamFont}px` : "inherit",
    };

    return (
        <div style={avatarStyle} className="Perfil01">
            <Link key={auxProps.id} to={{ pathname: `/user/${auxProps.username}`, state: auxProps }}>
                <div className="ConjuntoFotoNome">

                    {auxProps.profile_picture ? (
                        <img id="ImgAvatar" style={imageStyle} src={auxProps.profile_picture} alt="Avatar" />
                    ) : (
                        <img id="ImgAvatar" style={imageStyle} src={user_icon} alt="Default Avatar" />
                    )}
                    <p style={nameStyle}>{auxProps.username}</p>

                </div>
            </Link>
        </div>
    );
}

export default AvatarName;
