import ContentLoading from "../../../components/loading/Loading";
import useFetchStories from "../../../hooks/story/useFetchStories";
import StoryManagementHeader from "../../story/storyManagement/partials/StoryManagementHeader";
import StoryManagementPagination from "../../story/storyManagement/partials/StoryManagementPagination";
import TableStory from "../../story/storyManagement/partials/TableStory";
import DashboardManagementHeader from "./DashboardManagementHeader";
import TableDashboard from "./TableDashboard";

const Content = () => {
  const {
    stories,
    currentPage,
    totalPages,
    handlePageChange,
    loading,
    error,
    handleSearch,
    handleFilter,
  } = useFetchStories();

  if (loading) return <ContentLoading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <DashboardManagementHeader
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      <TableDashboard stories={stories} currentPage={currentPage} />
      <StoryManagementPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Content;
