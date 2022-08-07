
import NavBar from "../Components/NavBar";
import Pagination from "../Components/Pagination";
import { useState } from 'react';
const Items = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pages = 3;
    const pageLimit = 2;
    function goToNextPage() {
        if (currentPage === pages) {
            return;
        }
        setCurrentPage(currentPage + 1);
    }
    function goToPreviesPage() {
        if (currentPage === 1) {
            return;
        }
        setCurrentPage(currentPage - 1);
    }
    function changePage(event) {
        event.target.style.backgroundColor = "bg-yellow-800"
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    function paginationGroup() {
        const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        const renderData = new Array(pageLimit);

        for (let i = 0; i < renderData.length; i++) {
            let pageNo = start + i + 1;
            renderData[i] = pageNo
            if (pageNo === pages) {
                break;
            }
        }
        return renderData;
    }
    return (
        <>
            <NavBar />
            <Pagination currentPage={currentPage} />
            <div className="container mx-auto text-right mt-3">
                <button className="text-center border-t-2 border-b-2 border-l-2 border-black p-1 bg-yellow-600 " onClick={goToPreviesPage}>
                    Previous
                </button>
                {
                    paginationGroup().map((buttons) => {
                        return (
                            <button className="text-center border-t-2 border-b-2 border-l-2 border-black p-1 bg-yellow-600 " key={buttons} onClick={changePage}>
                                {buttons}
                            </button>
                        )
                    })
                }
                <button className="text-center border-2  border-black p-1 bg-yellow-600 " onClick={goToNextPage}>
                    Next
                </button>
            </div>
        </>
    )
}
export default Items;