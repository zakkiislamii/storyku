import React from "react";
import { X, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEditStory } from "../../../../hooks/story/useEditStory";
import StatusDropdown from "../../../../components/dropDown/StatusDropdown";
import CategoryDropdown from "../../../../components/dropDown/CategoryDropdown";
import ContentLoading from "../../../../components/loading/Loading";
import ChapterTable from "../../addStory/partials/ChapterTable";

const EditStoryForm = () => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    formData,
    selectedCategory,
    selectedStatus,
    newTag,
    filePreview,
    selectedFile,
    uploadStatus,
    uploadMessage,
    setSelectedCategory,
    setSelectedStatus,
    setNewTag,
    handleInputChange,
    handleFileChange,
    handleTagInput,
    removeTag,
    handleFormSubmit,
  } = useEditStory();

  if (loading) {
    return <ContentLoading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-6 px-10 w-full max-w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-black"
          >
            Title
          </label>
          <input
            required
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Title"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="writerName"
            className="block text-sm font-medium text-black"
          >
            Writer Name
          </label>
          <input
            required
            type="text"
            id="writerName"
            name="writerName"
            value={formData.writerName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Writer Name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="synopsis"
          className="block text-sm font-medium text-black"
        >
          Synopsis
        </label>
        <textarea
          id="synopsis"
          name="synopsis"
          value={formData.synopsis}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Synopsis"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Category
          </label>
          <CategoryDropdown
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Tags/Keywords Story
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[42px]">
            <div className="flex flex-wrap gap-2">
              {(formData?.tags ?? []).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-orange-500 text-white rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 hover:text-orange-200"
                  >
                    <X className="size-4" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleTagInput}
                placeholder="Press enter to add tags"
                className="outline-none border-none bg-transparent text-sm flex-grow min-w-[150px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Cover Image
          </label>
          <div className="flex items-center">
            <input
              type="file"
              className="hidden"
              id="coverImage"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <label
              htmlFor="coverImage"
              className="cursor-pointer flex justify-between items-center text-gray-500 px-3 py-1.5 border w-full border-gray-300 rounded-md hover:bg-gray-50"
            >
              <span>{selectedFile ? selectedFile.name : "Choose File"}</span>
              <span className="text-end">
                <FileText color="#c2c2c2" />
              </span>
            </label>
          </div>
          {filePreview && (
            <div className="mt-2">
              <img
                src={filePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}

          {uploadStatus === "uploading" && (
            <p className="text-sm text-blue-500">Uploading...</p>
          )}

          {uploadStatus === "success" && (
            <p className="text-sm text-green-500">{uploadMessage}</p>
          )}

          {uploadStatus === "error" && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">Status</label>
          <StatusDropdown
            selected={selectedStatus}
            setSelected={setSelectedStatus}
          />
        </div>
      </div>
      <ChapterTable
        chapters={formData.chapters}
        onEdit={(chapterId) => {
          console.log("Edit chapter:", chapterId);
        }}
        onDelete={(chapterId) => {
          console.log("Delete chapter:", chapterId);
        }}
      />
      <div className="space-y-2 flex md:justify-end justify-center items-center md:items-center gap-2 pt-5">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="px-4 py-3 bg-white border text-black rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-3 bg-orange-500 border border-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditStoryForm;
