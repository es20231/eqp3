import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useApi } from '../../hooks/UseApi';
import AvatarName from '../AvatarName';
import "./styles.scss";
import search_icon from '../../icons/search_icon.svg';

function SearchBar() {
    const api = useApi();
    const [show, setShow] = useState(false);
    const [listUserSearch, setListUserSearch] = useState([]);
    const [teste, setTeste] = useState([])

    const [searchValue, setSearchValue] = useState(''); // Estado para armazenar o valor da barra de pesquisa

    const handleClose = () => {
        setShow(false);
        setSearchValue(''); // Limpar o valor de pesquisa ao fechar o offcanvas
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.ListTimelineUsers();
                setListUserSearch(response.data);
            } catch (error) {
                console.error("Erro ao buscar os usuários:", error);
            }
        };

        fetchData();
    }, []);

    // Filtrar a lista de usuários com base no valor de pesquisa


    const filteredUsers = listUserSearch.filter(user =>
            user.username.toLowerCase().includes(searchValue.toLowerCase())
        );



    return (
        <>
            <Button
                variant="transparent"
                className="text-light"
                type="button"
                onClick={handleShow}
            >
                <img src={search_icon} alt="Search" />
                Search
            </Button>

            <Offcanvas className="offcanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Pesquisa</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="BodyOffCanvas">
                    <div className="input_icon">

                        <input
                            type="text"
                            placeholder="Search by user name"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}

                        />
                        <img src={search_icon} alt="Search" />
                    </div>
                    {filteredUsers.length > 0 &&
                        filteredUsers.map((user, index) => (
                            <AvatarName key={index} data={user} />
                        ))}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default SearchBar;
