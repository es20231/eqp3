import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import './styles.scss'
import moment from 'moment';

//icons
import like from "../../icons/like.svg";
import dislike from "../../icons/dislike.svg";
import { UserContext } from "../../Contexts/Auth/AuthContext";

function FotosDashboard(urlImg) {
    const { user } = useContext(UserContext)


    return (
        <div className="containerElement">
            <div className="testaImagem">

                {/* <AvatarName  propsAvatar = {auxData} /> */}

                <Button >...</Button>
            </div>

            <div className="ContainerImg">


                {<img src={urlImg.data.url }  /> || null}



            </div>
            <div className="queixoImageDashboard">
                <div className="ButtonLikes">
                    <button className="LikeBnt">
                        <img src={like} />
                          x 
                    </button>
                    <button className="DislikeBnt">
                        <img src={dislike} />
                         y 
                    </button>
                </div>
                <div className="DescriptionPost custom-scrollbar">
                    <h1> {urlImg.data.description} </h1>
                    <p> {moment(urlImg.data.created).format("DD MMM YYYY")}</p>
                </div>
                <div className="Comments">


                </div>
            </div>
        </div>
    );
}

export default FotosDashboard;