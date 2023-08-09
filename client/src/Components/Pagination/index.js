// import React from "react";
// import "./styles.scss"

// const Pagination = ({ totalImages, imagesPerPage, paginate }) => {
//   // Calcule o número total de páginas
//   const totalPages = Math.ceil(totalImages / imagesPerPage);

//   // Crie um array vazio para armazenar os botões das páginas
//   const pageButtons = [];

//   // Use um loop for para criar um botão para cada página
//   for (let i = 1; i <= totalPages; i++) {
//     pageButtons.push(
//       <button key={i} onClick={() => paginate(i)} className="page-button">
//         {i}
//       </button>
//     );
//   }
//   {console.log(paginate)}
//   return <div className="pagination">{pageButtons}</div>;
// };

// export default Pagination

//-----------

import React from "react";
import "./styles.scss";

const Pagination = ({ totalImages, imagesPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button key={i} onClick={() => handlePageChange(i)} className={`page-button ${i === currentPage ? 'active' : ''}`}>
        {i}
      </button>
    );
  }

  return <div className="pagination">{pageButtons}</div>;
};

export default Pagination;
