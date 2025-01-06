import { useState } from "react";

import SearchInput from "../components/search/SearchInput";
import ActionButtons from "../components/button/ActionButtons";
import { useSearch } from "../../../../hooks/story/useSearch";
import FilterModal from "../components/modal/filterModal/FilterModal";

const StoryManagementHeader = ({ onSearch, onFilter }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { searchQuery, isLoading, handleInputChange, handleKeyDown } =
    useSearch(onSearch);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg gap-4">
      <SearchInput
        searchQuery={searchQuery}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <ActionButtons onFilterClick={() => setShowFilterModal(true)} />
      <FilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onFilter={onFilter}
      />
    </div>
  );
};

export default StoryManagementHeader;
