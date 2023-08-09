
//----------------------------------------------------------------

import { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import "./styles.scss";
import FotosGaleria from "../FotosGaleria";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import Pagination from "../Pagination";
import FotosDashboard from "../FotosDashboard";

function ImportListDashboardImage() {
  const api = useApi();
  const [imagesListLength, setImagesListLength] = useState(0);
  const [imagemDownload, setImagemDownload] = useState([]);
  const userLocal = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 3;

  const indexOfFirstImage = (currentPage - 1) * imagesPerPage;
  const indexOfLastImage = currentPage * imagesPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const importImagensApi = async () => {
      const imagesAux = await api.importListTimelineImage(userLocal.user.name);
      setImagesListLength(imagesAux.data.length);
      {console.log(imagesListLength)}
      console.log("import lista Dash")
      console.log(imagesAux)

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
              created:dataName.created,
              description:dataName.description
            };
          })
        );
        setImagemDownload(importImages);
      }
    };

    importImagensApi();
  }, [userLocal.userUpdateData,  currentPage]);

  return (
    <>
      <Row md={3}>
        {imagemDownload.length > 0 &&
          imagemDownload.map((urlImg, index) => (
            <Col key={index} sm={true}>
              
              <FotosDashboard key={index} data={urlImg}/>
              {/* <FotosGaleria key={index} data={urlImg}></FotosGaleria> */}
            </Col>
          ))}
      </Row>

      <Pagination
        totalImages={imagesListLength}
        imagesPerPage={imagesPerPage}
        currentPage={currentPage}
        onPageChange={paginate}
      />
      <br />
    </>
  );
}

export default ImportListDashboardImage;
