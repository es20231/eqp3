// import { useContext, useState, useEffect } from "react";

// import { Row, Col, Button } from "react-bootstrap";
// import { useApi } from "../../hooks/UseApi";
// import './styles.scss'
// import FotosGaleria from "../FotosGaleria";
// import { UserContext } from "../../Contexts/Auth/AuthContext";
// import PaginationTp1 from "../Pagination";
// import Pagination from "../Pagination";



// function ImportListImage() {
//     const api = useApi();
//     const [imagesListLength, setImagesListLength] = useState(0)
//     const [imagemDownload, setImagemDownload] = useState({
//         url: '',
//         filename: ''
//     });
//     const userLocal = useContext(UserContext);


//     // Pagination

//     // Defina o estado da página atual, iniciando com 1
//     const [currentPage, setCurrentPage] = useState(1);

//     // Defina o número de imagens por página, no seu caso 9
//     const imagesPerPage = 3;

//     // Calcule o índice da primeira imagem da página atual
//     const indexOfFirstImage = (currentPage - 1) * imagesPerPage;

//     // Calcule o índice da última imagem da página atual
//     const indexOfLastImage = currentPage * imagesPerPage;

//     // //criando array de nomes
//     // const imageNames = imagemDownload.map((image) => image.filename);

//     // // lista com base somente nos nomes
//     // const currentImages = imageNames.slice(indexOfFirstImage, indexOfLastImage);


//     // Defina a função que muda a página atual
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     // function CurrentPage(pageNumber) {
//     //     setCurrentPage(pageNumber)
//     // }

//     useEffect(() => {
//         //Runs only on the first render
//         const importImagensApi = async () => {
//             const imagesAux = await api.importListImage();
//             console.log(imagesAux)

//             setImagesListLength(imagesAux.data.length);
            
//             console.log("tamanho da lista " + imagesListLength);
//             // Use Promise.all to fetch all images in parallel

//             // Obtenha a parte da lista de imagens que corresponde à página atual
//             console.log("test de current -11-")

//             const currentImages = imagesAux.data.slice(indexOfFirstImage, indexOfLastImage);


//             console.log("test de current -22-")

//             console.log(currentImages)

//             if (currentImages) {
//                 const importImages = await Promise.all(currentImages.map(async (dataName) => {
//                     return ({
//                         url: await api.importImage(dataName),
//                         filename: dataName
//                     });

//                 }));
//                 setImagemDownload(importImages);
//             }
//         }

//         importImagensApi();

//     }, [userLocal.userUpdateData]);

//     async function ImportImagensApi() {
//         setImagemDownload([]);
//         const images = await api.importListImage();
//         console.log(images.data);

//         images.data.map(async (dataName) => {
//             const importImages = await api.importImage(dataName);
//             setImagemDownload((prev) => [...prev, importImages]);
//         });

//         console.log("teste de armazenamento");
//         console.log(imagemDownload);
//     }





//     return (
//         <>

//             <Row md={3}>
//                 {imagemDownload.length > 0 && imagemDownload.map((urlImg, index) => (

//                     <Col key={index} sm={true}>
//                         <FotosGaleria key={index} data={urlImg.url}></FotosGaleria>

//                     </Col>

//                 ))}
//             </Row>

//             {/* <PaginationTp1 tamanho={imagemDownload.length} /> */}

//             <Pagination
//                 totalImages={imagesListLength}
//                 imagesPerPage={imagesPerPage}
//                 paginate={paginate}
//             />
//             <br />
//             {/* {console.log(paginate)} */}
//         </>
//     );
// }

// export default ImportListImage;

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
