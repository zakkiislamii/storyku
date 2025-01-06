import ContentLoading from "../../../components/loading/Loading";
import TableStory from "./partials/TableStory";
import useFetchStories from "../../../hooks/story/useFetchStories";
import StoryManagementHeader from "./partials/StoryManagementHeader";
import StoryManagementPagination from "./partials/StoryManagementPagination";

const StoryManagement = () => {
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
      <h1 className="font-bold p-4 text-3xl mb-10">Stories</h1>
      <StoryManagementHeader onSearch={handleSearch} onFilter={handleFilter} />
      <TableStory stories={stories} currentPage={currentPage} />
      <StoryManagementPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default StoryManagement;
