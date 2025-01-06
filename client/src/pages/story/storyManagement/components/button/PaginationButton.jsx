const PaginationButton = ({ onClick, disabled, children, isCurrentPage }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`border px-2 py-2 text-white ${
      isCurrentPage
        ? "bg-[#ff7300]"
        : "bg-[#f7af7f] hover:bg-[#ff7300] disabled:opacity-50"
    }`}
  >
    {children}
  </button>
);

export default PaginationButton;
