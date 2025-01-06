const SearchInput = ({ searchQuery, isLoading, onInputChange, onKeyDown }) => (
  <div className="flex items-center bg-gray-100 p-2 rounded-md w-full md:max-w-md">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-400 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.9 14.32a8 8 0 111.414-1.415l4.387 4.387a1 1 0 01-1.414 1.415l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
        clipRule="evenodd"
      />
    </svg>
    <input
      type="text"
      placeholder="Search by Writers / Title"
      value={searchQuery}
      onChange={onInputChange}
      onKeyDown={onKeyDown}
      className="bg-transparent outline-none md:text-sm text-md text-gray-700 flex-1"
    />
    {isLoading && (
      <svg
        className="animate-spin h-5 w-5 text-gray-400 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    )}
  </div>
);

export default SearchInput;
