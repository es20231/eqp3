import React from "react";
import { Button } from "react-bootstrap";
import './styles.scss'
import postImgIcon from '../../icons/image_arrow_right_icon_251943 1.svg';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';

function FotosGaleria(props) {

    return (
        <div className="containerElement">
            <div className="ContainerImg">

                <img src='https://th.bing.com/th/id/OIP.R0ncVbxDcwIslweprSNdbwHaE7?w=250&h=180&c=7&r=0&o=5&pid=1.7' />
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