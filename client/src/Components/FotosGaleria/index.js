import React from "react";
import { Button } from "react-bootstrap";
import './styles.scss'
import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';
import { useApi } from "../../hooks/UseApi";

function FotosGaleria(urlImg) {
    const api = useApi();

   async function handleDelete(){
      const delet =  await api.deleteImage();
      

    }

    return (
        <div className="containerElement">
            <div className="ContainerImg">
                <img src={urlImg.data} alt={`Imagem ${urlImg.index + 1}`} />
            </div>
            <div className="queixoImage">
                <button>
                    <img src={postImgIcon} />
                </button>
                <button onClick={handleDelete}>
                    <img src={trash} />
                </button>
            </div>
        </div>
    );
}

export default FotosGaleria;