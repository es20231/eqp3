
import { useState, useEffect, useContext } from 'react';
import { useApi } from './../../hooks/UseApi';
import './styles.scss'

//icons
import message_send from "../../icons/message_send_iconsvg.svg";
import like0 from "../../icons/like0.svg";
import like1 from "../../icons/like1.svg";
import dislike0 from "../../icons/dislike0.svg";
import dislike1 from "../../icons/dislike1.svg";


import Comments from "../Comments";
import Form from 'react-bootstrap/Form';
import PopButton from "../PopButton";
import AvatarName from "../AvatarName";
import { UserContext } from '../../Contexts/Auth/AuthContext';


function ButtonsLikes(props) {
    // props.tipo = post || comments

    const { user } = useContext(UserContext)
    const api = useApi()
    const [likes, setLikes] = useState([])

    const [boolLike, setBoolLike] = useState('0')
    const [boolDislike, setBoolDislike] = useState('0')
    const [buttonClick, setButtonClick] = useState('0')


    const [quantLike, setQuantLike] = useState([])
    const [quantDislike, setQuantDislike] = useState([])

    useEffect(() => {
        // Define an async function to fetch likes and update state
        const fetchLikes = async () => {
            try {

                console.log(props)
                if (props.data.id) {

                    if (props.tipo == 'post') {
                        const likesElement = await api.ImportLikesImage(props.data.id);
                        setLikes(likesElement.data);
                    } else if (props.tipo == 'comments') {
                        const likesElement = await api.ImportLikesCommentsImage(props.data.id);
                        setLikes(likesElement.data);
                    // console.log("Likes : ");
                    // console.log(likesElement)
                    }

                    


                    



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
        <div className="ButtonLikes">
            <button
                className="LikeBnt"
                id={"LikePost-"+props.data.filename}
                onClick={() => {
                    const likeClick = async () => {
                        try {

                            if (props.tipo == 'post') {
                                const dataLike = {
                                    tipo: 1,
                                    author_id: user.id, // Usuário logado 
                                    post_id: props.data.id
                                }
                                if (dataLike.author_id && dataLike.post_id) {
                                    const likeAux = await api.setLikesImage(dataLike)
                                    buttonClick ? setButtonClick(buttonClick => 0) : setButtonClick(buttonClick => 1)
                                }
                            } else if (props.tipo == 'comments') {
                                const dataLike = {
                                    tipo: 1,
                                    author_id: user.id, // Usuário logado 
                                    comment_id: props.data.id
                                }
                                if (dataLike.author_id && dataLike.comment_id) {
                                    const likeAux = await api.setLikesCommentsImage(dataLike)
                                    buttonClick ? setButtonClick(buttonClick => 0) : setButtonClick(buttonClick => 1)
                                }
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

                            if (props.tipo == 'post') {
                                const dataLike = {
                                    tipo: 0,
                                    author_id: user.id, // Usuário logado 
                                    post_id: props.data.id
                                }
                                if (dataLike.author_id && dataLike.post_id) {
                                    const likeAux = await api.setLikesImage(dataLike)
                                    buttonClick ? setButtonClick(buttonClick => 0) : setButtonClick(buttonClick => 1)
                                }
                            } else if (props.tipo == 'comments') {
                                const dataLike = {
                                    tipo: 0,
                                    author_id: user.id, // Usuário logado 
                                    comment_id: props.data.id
                                }
                                if (dataLike.author_id && dataLike.comment_id) {
                                    const likeAux = await api.setLikesCommentsImage(dataLike)
                                    buttonClick ? setButtonClick(buttonClick => 0) : setButtonClick(buttonClick => 1)
                                }
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

        </div>

    )
}

export default ButtonsLikes