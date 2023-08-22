import React, { useContext, useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import './styles.scss'
import moment from 'moment';

//icons
import message_send from "../../icons/message_send_iconsvg.svg";

import { UserContext } from "../../Contexts/Auth/AuthContext";
import { useApi } from "../../hooks/UseApi";
import Comments from "../Comments";
import Form from 'react-bootstrap/Form';
import trash from '../../icons/trash_delete_remove_icon_251766 1.svg';

import AvatarName from "../AvatarName";
import ButtonsLikes from "../ButtonsLikes";



function FotosDashboard(urlImg) {
    const { user, setUserUpdateData, userUpdateData } = useContext(UserContext)
    const api = useApi()
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState('')
    const [showElement, setShowElement] = useState(1)
    const [buttonClick, setButtonClick] = useState('0')

    // // receber os likes e dislikes 

    // COMMENTS
    const handleCommentChange = (event) => {
        setComments(event.target.value);
    };

    const handleAddComment = async () => {
        try {
            if (comments.trim() === "") {
                return;
            }

            const commentData = {
                author_id: user.id,
                post_id: urlImg.data.id,
                content: comments,
            };

            const response = await api.setCreateCommentsImage(commentData);

            // Atualizar o estado de comments e forçar a recarga dos comentários
            setComments("");
            setButtonClick(buttonClick === 0 ? 1 : 0);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };


    useEffect(() => {
        // Define an async function to fetch likes and update state
        const fetchLikes = async () => {
            try {

                console.log(urlImg)
                if (urlImg.data.id) {
                    const likesImage = await api.ImportLikesImage(urlImg.data.id);
                    setLikes(likesImage.data);


                    console.log("Likes : ");
                    console.log(likesImage)



                }
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };



        fetchLikes(); // Call the async function to fetch and set likes

        // No need for dependencies array since we are not using any external variables in the effect.
    }, [buttonClick]);




    return (

        <div className="containerElement">
            <div
                className="testaImagem"
                style={{ ...(urlImg.sendToTimeLine ? { display: 'inline-block', width: urlImg.tamBox, } : {}) }}
            >

                <AvatarName tamFont={10} tam={30} data={urlImg.data} />{/*  precisa que o back adicione o nome do usuario e profile_picture */}


            </div>

            <div className="ContainerImg">

                {<img
                    style={{ ...(urlImg.tamBox != null ? { width: urlImg.tamBox, height: urlImg.tamBox } : {}) }}
                    src={urlImg.data.url}
                /> || null}



            </div>
            <div
                className="queixoImageDashboard"
                style={{ ...(urlImg.tamBox != null ? { width: urlImg.tamBox } : {}) }}
            >
                <div className="ButtonsLikesDash">
                    <ButtonsLikes tipo="post" data={urlImg.data} />

                    <Comments data={{ post_id: urlImg.data.id, filename: urlImg.data.filename }} />
                    {/* Adicionar icon Delete post se for Dashboard */}
                    {urlImg.sendToDashboard &&
                        <button
                            style={{ marginLeft: "5px" }}
                            data-testid="trash-button"
                            onClick={async () => {
                                await api.DeletePostTimeline(urlImg.data.id);
                                // Atualizar a pagina
                                // setShowElement(showElement => 0)
                                setUserUpdateData(updateData => !userUpdateData)
                            }}>
                            <img src={trash} alt="Delete Image" />
                        </button>
                    }

                </div>
                <div className="DescriptionPost custom-scrollbar">
                    <h1> {urlImg.data.description} </h1>
                    <p> {moment(urlImg.data.created).format("DD MMM YYYY")}</p>
                </div>
                {/* <div className="linhaDiv" /> */}

                <br />


                <div className="AddComments">

                    {/* <input
                        type="text"
                        value={comments}
                        onChange={handleCommentChange}
                    />
                    <button onClick={handleAddComment}>Adicionar Comentário</button> */}

                    <InputGroup className="mb-3">
                        <Form.Control
                            id={"CommentsPost-" + urlImg.data.filename}
                            placeholder="Add Comment"
                            aria-label="Add Comment"
                            aria-describedby="basic-addon2"
                            value={comments}
                            onChange={handleCommentChange}
                        />
                        <Button
                            id={"SendCommentsPost-" + urlImg.data.filename}
                            variant="tp_1"

                            onClick={handleAddComment}
                        >
                            <img src={message_send} />
                        </Button>
                    </InputGroup>
                </div>
            </div>
        </div >
    );
}


export default FotosDashboard;