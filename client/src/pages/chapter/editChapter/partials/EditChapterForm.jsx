import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useChapter } from "../../../../hooks/chapter/useChapter";
import Modal from "../../../../components/modal/error/Modal";
import { useNavigate } from "react-router-dom";

const EditChapterForm = () => {
  const navigate = useNavigate();
  const { chapter_id } = useParams();
  const quillRef = useRef(null);
  const { loading, error, formData, setFormData, handleUpdateChapter } =
    useChapter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    message: "",
    onConfirm: () => {},
  });

  const handleCancel = () => {
    setModalConfig({
      message:
        "Are you sure you want to cancel adding the chapter without saving the data?",
      onConfirm: () => {
        window.close();
        navigate(-1);
      },
    });
    setIsModalOpen(true);
  };

  const handleSaveConfirmation = (e) => {
    e.preventDefault();
    setModalConfig({
      message: "Are you sure you want to save the added chapters?",
      onConfirm: async () => {
        const success = await handleUpdateChapter(chapter_id, formData);
        if (success) {
          if (window.opener) {
            window.opener.postMessage(
              {
                type: "UPDATE_CHAPTER",
                chapter: { ...formData, chapter_id },
              },
              window.location.origin
            );
          }
          setTimeout(() => window.close(), 100);
        }
      },
    });
    setIsModalOpen(true);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ align: [] }],
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["link", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "size",
    "align",
    "header",
    "link",
    "code-block",
    "list",
    "bullet",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <form
        onSubmit={handleSaveConfirmation}
        className="space-y-6 px-10 w-full max-w-full gap-1 flex flex-col"
      >
        <div className="space-y-2 w-full">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-black"
          >
            Chapter Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Title"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-black"
          >
            Story
          </label>
          <div className="rounded-md md:pb-12 pb-20">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={formData.content}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
              className="h-60"
            />
          </div>
        </div>

        <div className="space-y-2 flex md:justify-end justify-center items-center md:items-center gap-2 pt-5">
          <button
            onClick={handleCancel}
            type="button"
            className="px-4 py-3 bg-white border text-black rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-3 bg-orange-500 border border-orange-500 text-white rounded-md 
              ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-600"
              }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
      />
    </>
  );
};

export default EditChapterForm;
