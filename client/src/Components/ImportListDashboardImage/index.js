
//----------------------------------------------------------------

import { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import "./styles.scss";
import FotosGaleria from "../FotosGaleria";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import Pagination from "../Pagination";
import FotosDashboard from "../FotosDashboard";

function ImportListDashboardImage(props) {



  const api = useApi();
  const [imagesListLength, setImagesListLength] = useState(0);
  const [imagemDownload, setImagemDownload] = useState([]);
  const userLocal = useContext(UserContext);

  const [currentPageDashboard, setCurrentPageDashboard] = useState(1);
  const imagesPerPage = 3;

  const indexOfFirstImage = (currentPageDashboard - 1) * imagesPerPage;
  const indexOfLastImage = currentPageDashboard * imagesPerPage;

  const paginate = (pageNumber) => setCurrentPageDashboard(pageNumber);

  useEffect(() => {
    const importImagensApi = async () => {
      //mudar essa função para receber o nome  do usuário


      if (props.userNameDash) {
        const imagesAux = await api.importListTimelineImage(props.userNameDash);//(userLocal.user.username);
      
        setImagesListLength(imagesAux.data.length);



        const currentImages = imagesAux.data.slice(
          indexOfFirstImage,
          indexOfLastImage
        );

        if (currentImages.length > 0) {
          const importImages = await Promise.all(
            currentImages.map(async (dataName) => {
              console.log(dataName)
              return {
                url: await api.importImage(dataName.filename),
                filename: dataName.filename,
                created: dataName.created,
                description: dataName.description,
                id: dataName.id,
                image_id:dataName.image_id,

              };
            })
          );


          setImagemDownload(importImages);

        } else {
         
          setImagemDownload("");
        }
      }
    };

    importImagensApi();
  }, [currentPageDashboard, props]);

  return (
    <>
      <Row md={3}>
        {imagemDownload.length > 0 &&
          imagemDownload.map((urlImg, index) => (
            <Col key={index} sm={true}>

              <FotosDashboard key={index} data={urlImg} />
              {/* <FotosGaleria key={index} data={urlImg}></FotosGaleria> */}
            </Col>
          ))}
      </Row>

      <Pagination
        totalImages={imagesListLength}
        imagesPerPage={imagesPerPage}
        currentPageDashboard={currentPageDashboard}
        onPageChange={paginate}
      />
      <br />
    </>
  );
}

export default ImportListDashboardImage;
