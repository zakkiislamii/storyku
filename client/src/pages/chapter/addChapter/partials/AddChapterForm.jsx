import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddChapterForm = () => {
  const [loading, setLoading] = useState(false);
  const quillRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const chapterData = {
        title: formData.title,
        content: formData.content,
      };

      // Pastikan window.opener ada sebelum mengirim pesan
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "NEW_CHAPTER",
            chapter: chapterData,
          },
          window.location.origin
        );
      }
      setTimeout(() => {
        window.close();
      }, 100);
    } catch (error) {
      console.error("Error submitting chapter:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 px-10 w-full max-w-full gap-1 flex flex-col"
    >
      <div className="space-y-2 w-full">
        <label htmlFor="title" className="block text-sm font-medium text-black">
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
          onClick={() => window.close()}
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
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddChapterForm;
