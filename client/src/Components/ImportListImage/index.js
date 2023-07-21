import { useContext ,useState ,useEffect} from "react";

import { Row, Col } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import './styles.scss'
import FotosGaleria from "../FotosGaleria";
import { UserContext } from "../../Contexts/Auth/AuthContext";


function ImportListImage() {
    const api = useApi();
    const [imagemDownload, setImagemDownload] = useState([]);
    const userLocal = useContext(UserContext);


    useEffect(() => {
        //Runs only on the first render
        const importImagensApi = async () => {
            const images = await api.importListImage();
            // console.log(images);
            // Use Promise.all to fetch all images in parallel
            if (images) {
                const importImages = await Promise.all(images.data.map(dataName => api.importImage(dataName)));
                setImagemDownload(importImages);
            }
        }

        importImagensApi();

    }, [userLocal.userUpdateData]);

    async function ImportImagensApi () {
        setImagemDownload([]);
        const images = await api.importListImage();
        console.log(images.data);

        images.data.map(async (dataName) => {
            const importImages = await api.importImage(dataName);
            setImagemDownload((prev) => [...prev, importImages]);
        });

        console.log("teste de armazenamento");
        console.log(imagemDownload);
    }



    return (
        <>
             <Button type="button" onClick={ImportImagensApi}>
                baixar imagens do usuário
            </Button> 
            <Row>
                {imagemDownload.length > 0 && imagemDownload.map((urlImg, index) => (

                    <Col key={index}>
                        <FotosGaleria key={index} data={urlImg}></FotosGaleria>
                    </Col>

                ))}
            </Row>
        </>
    );
}

export default ImportListImage;
