import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useApi } from '../../hooks/UseApi';
import menssage_icon from '../../icons/message.svg'

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
          <div  key={dataComment.id}>
            <p>{dataComment.author_id}</p>
            <h2>{dataComment.content}</h2>
            <p>{dataComment.created}</p>
          </div>
        ));
      };

    return (
        <>
            <button 
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