import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DetailChapterForm = () => {
  const location = useLocation();
  const { title, content } = location.state; // Destructure data yang dikirim
  const quillRef = useRef(null);

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

  return (
    <>
      <form className="space-y-6 px-10 w-full max-w-full gap-1 flex flex-col">
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
            value={title}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Title"
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
              value={content}
              readOnly
              modules={modules}
              formats={formats}
              className="h-60"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default DetailChapterForm;
