import React, { useContext, useEffect, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import './styles.scss'
import moment from 'moment';

//icons
import like0 from "../../icons/like0.svg";
import like1 from "../../icons/like1.svg";
import dislike0 from "../../icons/dislike0.svg";
import dislike1 from "../../icons/dislike1.svg";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import { useApi } from "../../hooks/UseApi";
import Comments from "../Comments";
import Form from 'react-bootstrap/Form';

function FotosDashboard(urlImg) {
    const { user } = useContext(UserContext)
    const api = useApi()
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState('')
    const [boolLike, setBoolLike] = useState('0')
    const [boolDislike, setBoolDislike] = useState('0')
    const [buttonClick, setButtonClick] = useState('0')


    const [quantLike, setQuantLike] = useState('0')
    const [quantDislike, setQuantDislike] = useState('0')
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
    }, [boolLike, boolDislike, buttonClick]);

    useEffect(() => {
        setQuantLike(quantLike => 0)
        setQuantDislike(quantDislike => 0)
        likes.map((likesUsers) => {


            if (likesUsers.tipo == 1) {
                setQuantLike(quantLike => quantLike + 1)
            } else {
                setQuantDislike(quantDislike => quantDislike + 1)
            }

            if (likesUsers.author_id == user.id && likesUsers.tipo == 1) {
                setBoolLike(boolLike => 1)
            } else if (likesUsers.author_id == user.id && likesUsers.tipo == 0) {
                setBoolDislike(boolDislike => 1)
            }
        })
    }, [likes])

    return (
        <div className="containerElement">
            <div className="testaImagem">

                {/* <AvatarName  propsAvatar = {auxData} /> */}

                <Button >...</Button>
            </div>

            <div className="ContainerImg">

                {<img src={urlImg.data.url} /> || null}



            </div>
            <div className="queixoImageDashboard">
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
                        {quantLike}
                    </button>
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
                        {quantDislike}
                    </button>
                    <Comments data={{ post_id: urlImg.data.id }} />
                </div>

                <div className="DescriptionPost custom-scrollbar">
                    <h1> {urlImg.data.description} </h1>
                    <p> {moment(urlImg.data.created).format("DD MMM YYYY")}</p>
                </div>
                <p>Comentário</p>


                <div className="AddComments">

                    {/* <input
                        type="text"
                        value={comments}
                        onChange={handleCommentChange}
                    />
                    <button onClick={handleAddComment}>Adicionar Comentário</button> */}

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={comments}
                            onChange={handleCommentChange}
                        />
                        <Button
                            variant="tp_1"
                            id="button-addon2"
                            onClick={handleAddComment}
                        >
                            seta -
                        </Button>
                    </InputGroup>
                </div>
            </div>
        </div >
    );
}

export default FotosDashboard;