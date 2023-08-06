import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import './styles.scss'
import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';
import { useApi } from "../../hooks/UseApi";
import { UserContext } from "../../Contexts/Auth/AuthContext";

function FotosGaleria(urlImg) {
    const api = useApi();
    const userLocal = useContext(UserContext)
    //    async function handleDelete(){
    //       const delet =  await api.deleteImage();


    //     }

    return (
        <div className="containerElement">
            <div className="ContainerImg">
                <img src={urlImg.data.url} alt={`Imagem ${urlImg.index + 1}`} />
                
            </div>
            <div className="queixoImage">
                <button>
                    <img src={postImgIcon} />
                </button>
                <button data-testid="trash-button"
                    onClick={
                        async () => {
                            await api.deleteImage(urlImg.data.filename);
                            userLocal.setUserUpdateData(!userLocal.userUpdateData);
                        }}
                >
                    <img src={trash} />
                </button>
            </div>
        </div>
    );
}

export default FotosGaleria;