import { useState } from "react";
import ContentLoading from "../../../../components/loading/Loading";
import Modal from "../../../../components/modal/error/Modal";
import { useDeleteStory } from "../../../../hooks/story/useDeleteStory";
import { getStatusColor } from "../../utils/getStatusColor";
import ActionMenu from "../components/button/ActionMenu";
import { useNavigate } from "react-router-dom";

const TableStory = ({ stories, currentPage }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [storyIdToDelete, setStoryIdToDelete] = useState(null);
  const { loading, error, handleDeleteStory } = useDeleteStory();

  const handleDeleteConfirmation = (storyId) => {
    setStoryIdToDelete(storyId);
    setShowModal(true);
  };
  const onEdit = (story_id) => {
    navigate(`/stories/edit/${story_id}`);
  };

  const onConfirmDelete = async () => {
    if (storyIdToDelete) {
      await handleDeleteStory(storyIdToDelete, () => {
        window.location.reload();
        setShowModal(false);
      });
    }
  };
  const itemsPerPage = 5;

  if (loading) {
    return <ContentLoading />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="rounded-md w-full min-h-[85vh] max-w-screen overflow-x-auto ">
      <table className="table-auto divide-y w-full divide-gray-200">
        <thead className="bg-gray-50 text-black font-bold">
          <tr>
            <th className="px-6 py-3 text-left text-black text-xs tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Writer
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Keywords
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stories && stories.length > 0 ? (
            stories.map((story, index) => (
              <tr key={index} className="hover:bg-gray-50 text-[#696969]">
                <td className="px-6 py-4 text-sm text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4  text-sm font-medium">
                  {story.title}
                </td>
                <td className="px-6 py-4  text-sm">{story.writer}</td>
                <td className="px-6 py-4  text-sm">
                  <span className="p-1 rounded-full text-xs font-semibold">
                    {story.category}
                  </span>
                </td>
                <td className="px-6 py-4  text-sm">
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4  text-sm text-gray-500">
                  <span
                    className={`${getStatusColor(
                      story.status
                    )} px-2 py-2 rounded-full text-xs font-semibold`}
                  >
                    {story.status}
                  </span>
                </td>
                <td className="relative text-center w-20 ">
                  <ActionMenu
                    onEdit={() => onEdit(story.story_id)}
                    onDelete={() => handleDeleteConfirmation(story.story_id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                No stories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        open={showModal}
        onClose={setShowModal}
        message="Are you sure you want to delete this story?"
        onConfirm={onConfirmDelete}
      />
    </div>
  );
};

export default TableStory;
