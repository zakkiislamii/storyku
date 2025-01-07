import { useState } from "react";
import SearchInput from "../../story/storyManagement/components/search/SearchInput";
import ActionButtons from "../../story/storyManagement/components/button/ActionButtons";
import FilterModal from "../../story/storyManagement/components/modal/filterModal/FilterModal";
import { useSearch } from "../../../hooks/story/useSearch";
import ActionButtonsDashboard from "./ActionButtonsDashboard";

const DashboardManagementHeader = ({ onSearch, onFilter }) => {
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
      <ActionButtonsDashboard onFilterClick={() => setShowFilterModal(true)} />
      <FilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onFilter={onFilter}
      />
    </div>
  );
};

export default DashboardManagementHeader;
