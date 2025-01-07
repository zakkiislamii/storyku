const ActionButtonsDashboard = ({ onFilterClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
      <button
        onClick={onFilterClick}
        className="flex items-center justify-center w-10 h-10 border rounded-full border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-filter"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </button>
    </div>
  );
};

export default ActionButtonsDashboard;
