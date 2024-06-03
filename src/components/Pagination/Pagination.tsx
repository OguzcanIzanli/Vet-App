import { PaginationType } from "./types";
import "./Pagination.styles.css";

const Pagination = ({ page, totalPages, setPage }: PaginationType) => (
  <div className="paginationBar">
    <button
      className="paginationBtn"
      disabled={page === 0}
      onClick={() => setPage(page - 1)}
    >
      Önceki
    </button>
    <span className="pageNumber">{page + 1}</span>
    <button
      className="paginationBtn"
      disabled={page >= totalPages - 1}
      onClick={() => setPage(page + 1)}
    >
      Sonraki
    </button>
  </div>
);

export default Pagination;
