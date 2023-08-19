import React, { useContext, useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import './styles.scss'
import moment from 'moment';

//icons
import message_send from "../../icons/message_send_iconsvg.svg";
import like0 from "../../icons/like0.svg";
import like1 from "../../icons/like1.svg";
import dislike0 from "../../icons/dislike0.svg";
import dislike1 from "../../icons/dislike1.svg";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import { useApi } from "../../hooks/UseApi";
import Comments from "../Comments";
import Form from 'react-bootstrap/Form';
import PopButton from "../PopButton";
import AvatarName from "../AvatarName";



function FotosDashboard(urlImg) {
    const { user } = useContext(UserContext)
    const api = useApi()
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState('')
    const [boolLike, setBoolLike] = useState('0')
    const [boolDislike, setBoolDislike] = useState('0')
    const [buttonClick, setButtonClick] = useState('0')


    const [quantLike, setQuantLike] = useState([])
    const [quantDislike, setQuantDislike] = useState([])
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

            const response = await api.setCreateCommentsImage(commentData); // Substitua pelo nome do método para adicionar um comentário

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



    useEffect(() => {
        setQuantLike([])
        setQuantDislike([])
        likes.map((likesUsers) => {


            if (likesUsers.tipo == 1) {

                setQuantLike(quantLike => [...quantLike, likesUsers])

            } else {
                setQuantDislike(quantDislike => [...quantDislike, likesUsers])
            }

            if (likesUsers.username == user.username && likesUsers.tipo == 1) {
                setBoolLike(boolLike => 1)

            } else if (likesUsers.username == user.username && likesUsers.tipo == 0) {

                setBoolDislike(boolDislike => 1)
            }
        })
    }, [likes])

    return (
        <div className="containerElement">
            <div 
            className="testaImagem"
            style={{ ...(urlImg.sendToTimeLine  ? { display: 'inline-block',width: urlImg.tamBox,  } : {}) }}
            >
                {console.log("urlImg.data -> FotosDashboard **************")}
                {console.log(urlImg.data)}
                 <AvatarName  tam={30} data = {urlImg.data} />{/*  precisa que o back adicione o nome do usuario e profile_picture */}

                
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
                <div className="ButtonLikes">
                    <button
                        className="LikeBnt"
                        onClick={() => {
                            const likeClick = async () => {
                                try {

                                    const dataLike = {
                                        tipo: 1,
                                        author_id: user.id, // Usuário logado 
                                        post_id: urlImg.data.id
                                    }
                                    if (dataLike.author_id && dataLike.post_id) {
                                        const likeAux = await api.setLikesImage(dataLike)
                                        buttonClick ? setButtonClick(buttonClick => 0) : setButtonClick(buttonClick => 1)
                                    }
                                } catch (e) {
                                    console.log("409")
                                }
                            }
                            likeClick();
                        }}
                    >
                        {boolLike == 1 ? <img src={like1} /> : <img src={like0} />}


                    </button>
                    {/* LISTA DOS USUÁRIOS QUE DERAM LIKE  */}

                    <PopButton data={quantLike} />

                    <button
                        className="DislikeBnt"
                        onClick={() => {
                            const dislikeClick = async () => {
                                try {

                                    const dataLike = {
                                        tipo: 0,
                                        author_id: user.id, // Usuário logado 
                                        post_id: urlImg.data.id
                                    }
                                    if (dataLike.author_id && dataLike.post_id) {
                                        const likeAux = await api.setLikesImage(dataLike)
                                        buttonClick ? setButtonClick(buttonClick => 0) : setButtonClick(buttonClick => 1)
                                    }
                                } catch (e) {
                                    console.log("409")
                                }
                            }
                            dislikeClick();
                        }
                        }
                    >
                        {boolDislike == 1 ? <img src={dislike1} /> : <img src={dislike0} />}

                    </button>
                    <PopButton data={quantDislike} />
                    {console.log(quantDislike)}
                    <Comments data={{ post_id: urlImg.data.id }} />
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
                            placeholder="Add Comment"
                            aria-label="Add Comment"
                            aria-describedby="basic-addon2"
                            value={comments}
                            onChange={handleCommentChange}
                        />
                        <Button
                            variant="tp_1"
                            id="button-addon2"
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