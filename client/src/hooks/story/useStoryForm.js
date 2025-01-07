import { useState, useEffect } from "react";
import { createStory } from "../../services/story";

export const useStoryForm = (navigate) => {
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    writerName: "",
    synopsis: "",
    tags: [],
    chapters: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      if (!formData.tags.includes(newTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()],
        }));
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e, coverUrl) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!coverUrl) {
        throw new Error("Please select a cover image");
      }

      const storyData = {
        title: formData.title,
        writer: formData.writerName,
        synopsis: formData.synopsis,
        category: selectedCategory.toLowerCase(),
        cover: coverUrl,
        tags: formData.tags,
        status: selectedStatus.toLowerCase(),
        chapters: formData.chapters,
      };
      const response = await createStory(
        storyData,
        import.meta.env.VITE_API_KEY
      );

      if (response?.status === "success" && response?.code === 201) {
        navigate("/stories");
        return true;
      }
    } catch (error) {
      setError(error.message || "Failed to create story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleChapter = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data.type === "NEW_CHAPTER") {
        setFormData((prev) => ({
          ...prev,
          chapters: [...prev.chapters, event.data.chapter],
        }));
      }
    };
    window.addEventListener("message", handleChapter);
    return () => window.removeEventListener("message", handleChapter);
  }, []);

  return {
    formData,
    selectedCategory,
    selectedStatus,
    newTag,
    loading,
    error,
    setSelectedCategory,
    setSelectedStatus,
    setNewTag,
    handleInputChange,
    handleTagInput,
    removeTag,
    handleSubmit,
  };
};
