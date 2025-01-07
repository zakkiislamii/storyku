import React from "react";
import { useEditStory } from "../../../../../hooks/story/useEditStory";
import ContentLoading from "../../../../../components/loading/Loading";
import ChapterTableDashboardDetail from "../ChapterTableDashboard";

const StoryDetailForm = () => {
  const {
    loading,
    error,
    formData,
    selectedCategory,
    selectedStatus,
    filePreview,
    uploadStatus,
    uploadMessage,
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
    <div className="space-y-6 px-10 w-full max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-black"
          >
            Title
          </label>
          <p className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.title}
          </p>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="writerName"
            className="block text-sm font-medium text-black"
          >
            Writer Name
          </label>
          <p className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.writerName}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="synopsis"
          className="block text-sm font-medium text-black"
        >
          Synopsis
        </label>
        <p className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
          {formData.synopsis}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Category
          </label>
          <p className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
            {selectedCategory}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Tags/Keywords Story
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 min-h-[42px]">
            <div className="flex flex-wrap gap-2">
              {(formData?.tags ?? []).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-orange-500 text-white rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Cover Image
          </label>
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
          <p className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
            {selectedStatus}
          </p>
        </div>
      </div>
      <ChapterTableDashboardDetail chapters={formData.chapters} isViewOnly />
    </div>
  );
};

export default StoryDetailForm;
