import React from "react";

const ManagementStoryHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg gap-4">
      {/* Search bar */}
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
          className="bg-transparent outline-none md:text-sm text-md text-gray-700 flex-1"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <button className="flex items-center justify-center w-10 h-10 border rounded-full border-gray-300 text-gray-600 hover:bg-gray-100">
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
        <button className="flex items-center bg-orange-500 text-white px-5 py-2 rounded-[3rem] hover:bg-orange-600 text-sm md:text-base">
          <span className="font-semibold mr-2">+ Add Story</span>
        </button>
      </div>
    </div>
  );
};

export default ManagementStoryHeader;
