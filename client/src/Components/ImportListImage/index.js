
//----------------------------------------------------------------

import { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useApi } from "../../hooks/UseApi";
import "./styles.scss";
import FotosGaleria from "../FotosGaleria";
import { UserContext } from "../../Contexts/Auth/AuthContext";
import Pagination from "../Pagination";

function ImportListImage() {
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
      const imagesAux = await api.importListImage();
      setImagesListLength(imagesAux.data.length);

      const currentImages = imagesAux.data.slice(
        indexOfFirstImage,
        indexOfLastImage
      );

      if (currentImages.length > 0) {
        const importImages = await Promise.all(
          currentImages.map(async (dataName) => {
            return {
              url: await api.importImage(dataName),
              filename: dataName,
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
              <FotosGaleria key={index} data={urlImg}></FotosGaleria>
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

export default ImportListImage;
