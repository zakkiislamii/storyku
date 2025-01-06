import { MoveLeft, MoveRight } from "lucide-react";
import PaginationButton from "../components/button/PaginationButton";
const StoryManagementPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="mt-3 p-3 justify-between flex">
    <h1>
      Menampilkan halaman {currentPage} dari {totalPages}
    </h1>
    <div className="flex gap-2 items-center">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MoveLeft color="#ffffff" />
      </PaginationButton>
      <PaginationButton isCurrentPage>{currentPage}</PaginationButton>

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MoveRight color="#ffffff" />
      </PaginationButton>
    </div>
  </div>
);

export default StoryManagementPagination;
