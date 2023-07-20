import React from "react";
import { Button } from "react-bootstrap";
import './styles.scss'
import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';

function FotosGaleria(urlImg) {

    return (
        <div className="containerElement">
            <div className="ContainerImg">
                <img src={urlImg.data} />
            </div>
            <div className="queixoImage">
                <button>
                    <img src={postImgIcon} />
                </button>
                <button>
                    <img src={trash} />
                </button>
            </div>
        </div>
    );
}

export default FotosGaleria;