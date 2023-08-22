import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useApi } from '../../hooks/UseApi';
import menssage_icon from '../../icons/message.svg'
import AvatarName from '../AvatarName';
import './styles.scss'
import ButtonsLikes from '../ButtonsLikes';

function Comments(props) {
  const api = useApi()
  const [show, setShow] = useState(false);
  const [listComments, setListComments] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // pegar os dados dos comentários 
  // recebe o id do post 
  async function getCommentsPost() {

    const comments = await api.ImportCommentsImage(props.data.post_id)//id do post 
    setListComments(listComments => comments.data);
    console.log("comments lista -----")
    console.log(comments)
  }

  useEffect(() => {
    if (show) {
      getCommentsPost();
    }
  }, [show]);

  const renderComments = () => {
    return listComments.map((dataComment) => (
      <div key={dataComment.id} className="commentBox">
        <AvatarName tam={27} tamFont={14} key={dataComment.id} data={dataComment} />
        <h1>{dataComment.content}</h1>
        <p>{dataComment.created}</p>
        {/* Adicionar a opção de Like e Dislike */}
        <ButtonsLikes data={dataComment} tipo="comments"/>

      </div>
    ));
  };

  return (
    <>
      <button
      id={"ShowComments-"+ props.data.filename}
        onClick={
          () => {
            handleShow();
            getCommentsPost();
          }
        } >
        <img src={menssage_icon} />
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> Comments </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          {renderComments()}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Comments;