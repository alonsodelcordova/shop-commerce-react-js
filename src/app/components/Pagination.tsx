
interface PaginationProps {
    pages: number[];
    changePage: (page: number) => void;
}

export default function Pagination({ pages, changePage }: PaginationProps) {

    return (
        <nav className="d-flex justify-content-center">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {pages.map(el =>
                    <li key={el} className="page-item"><button className="page-link"
                        onClick={() => changePage(el)}
                    >{el + 1}</button></li>
                )}
                <li className="page-item">
                    <button className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    )
}