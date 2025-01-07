import React, { useState } from "react";
import ActionMenu from "../../storyManagement/components/button/ActionMenu";
import { useNavigate } from "react-router-dom";
import { useChapter } from "../../../../hooks/chapter/useChapter";
import Modal from "../../../../components/modal/error/Modal";

const ChapterTable = ({ chapters, onChapterUpdated }) => {
  const navigate = useNavigate();
  const { handleDeleteChapter } = useChapter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    message: "",
    onConfirm: () => {},
  });

  if (!chapters || chapters.length === 0) {
    return null;
  }

  const handleEdit = (chapter) => {
    navigate(`/chapter/edit/${chapter.chapter_id}`, {
      state: { chapter },
    });
  };

  const handleDelete = (chapter) => {
    setModalConfig({
      message: "Are you sure you want to delete this chapter?",
      onConfirm: async () => {
        const success = await handleDeleteChapter(chapter.chapter_id);
        if (success) {
          onChapterUpdated && onChapterUpdated();
        }
      },
    });
    setIsModalOpen(true);
  };

  return (
    <div className="rounded-md w-full min-h-[50vh] max-w-screen overflow-x-auto">
      <table className="table-auto border w-full divide-gray-200">
        <thead className="bg-gray-50 text-black font-bold">
          <tr>
            <th className="px-2 py-3 text-left text-xs tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs tracking-wider">
              Last Update
            </th>
            <th className="px-6 py-3 text-center text-xs tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {chapters.map((chapter) => (
            <tr
              key={chapter.chapter_id}
              className="hover:bg-gray-50 text-[#696969] border"
            >
              <td className="px-6 py-4 text-sm font-medium">{chapter.title}</td>
              <td className="px-6 py-4 text-sm">
                {new Date(chapter.updatedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="relative text-center w-full justify-center items-center flex">
                <ActionMenu
                  onEdit={() => handleEdit(chapter)}
                  onDelete={() => handleDelete(chapter)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
      />
    </div>
  );
};

export default ChapterTable;
