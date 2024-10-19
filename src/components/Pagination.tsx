import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleFirstPage = () => {
        onPageChange(1);
    };

    const handleLastPage = () => {
        onPageChange(totalPages);
    };

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                className={`mx-1 px-3 py-1 border rounded-lg bg-white ${currentPage === 1 ? "text-[#d7d8e2] border-[#f6f6fb] opacity-50 cursor-not-allowed" : "text-black border-[#d7d8e2] hover:bg-gray-200"}`}
            >
                <FontAwesomeIcon icon={faAngleDoubleLeft} className="text-gray-600" />
            </button>

            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`mx-1 px-3 py-1 border rounded-lg bg-white ${currentPage === 1 ? "text-[#d7d8e2] border-[#f6f6fb] opacity-50 cursor-not-allowed" : "text-black border-[#d7d8e2] hover:bg-gray-200"}`}
            >
                <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600" />
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 px-3 py-1 border rounded-lg bg-white ${currentPage === index + 1 ? "bg-[#fea52a] text-white" : "text-black border-[#d7d8e2] hover:bg-gray-200"}`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`mx-1 px-3 py-1 border rounded-lg bg-white ${currentPage === totalPages ? "text-[#d7d8e2] border-[#f6f6fb] opacity-50 cursor-not-allowed" : "text-black border-[#d7d8e2] hover:bg-gray-200"}`}
            >
                <FontAwesomeIcon icon={faChevronRight} className="text-gray-600" />
            </button>

            <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                className={`mx-1 px-3 py-1 border rounded-lg bg-white ${currentPage === totalPages ? "text-[#d7d8e2] border-[#f6f6fb] opacity-50 cursor-not-allowed" : "text-black border-[#d7d8e2] hover:bg-gray-200"}`}
            >
                <FontAwesomeIcon icon={faAngleDoubleRight} className="text-gray-600" />
            </button>
        </div>
    );
};

export default Pagination;
