import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useApi } from '../../hooks/UseApi';
import AvatarName from '../AvatarName';
import "./styles.scss"
import { Link } from 'react-router-dom';

function SearchBar() {
    const [show, setShow] = useState(false);
    const [listUserSearch, setListUserSearch] = useState([])
    const [listUserSearchFormatted, setListUserSearchFormatted] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.ListTimelineUsers();
                setListUserSearch(response.data);
               
                // fazer o tratamento 
                const importImages = await Promise.all(
                    response.data.map(async (dataName) => {
                        return {
                            profile_picture: await api.importImage(dataName.profile_picture),
                            username: dataName.username
                        }
                    }))

                setListUserSearchFormatted(importImages)

            } catch (error) {
                console.error("Erro ao buscar os usuários:", error);
            }
        };

        fetchData();
    }, []);

    const api = useApi()
    return (
        <>
            <Button variant="transparent"
                className=" text-light"
                type="button"
                onClick={handleShow}>
                Search
            </Button>

            <Offcanvas className="offcanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Pesquisa</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='BodyOffCanvas'>
                    {listUserSearchFormatted.length > 0 &&
                        listUserSearchFormatted.map((urlImg, index) => (

                            <Link key={index} to={{ pathname: `/user/${urlImg.username}`, state: { profile_picture: urlImg.profile_picture } }}>
                               
                                <AvatarName key={index} data={urlImg}></AvatarName>
                            </Link>
                        ))}


                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default SearchBar;