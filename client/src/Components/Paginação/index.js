import Pagination from 'react-bootstrap/Pagination';


function PaginationTp1(props) {
    console.log(props)
    let active = 2;
    let items = [];
    for (let number = 1; number <= props.tamanho; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }


    return (
        <Pagination className="d-flex justify-content-center ">

            <Pagination.First />
            {/* <Pagination.Item>{1}</Pagination.Item> */}
            
            <Pagination >{items}</Pagination>
            {/* <Pagination.Item>{20}</Pagination.Item> */}
            
            <Pagination.Last />

        </Pagination>
    );
}

export default PaginationTp1;