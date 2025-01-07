import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStoryById, updateStory, uploadImage } from "../../services/story";

export const useEditStory = () => {
  const { story_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newTag, setNewTag] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    writerName: "",
    synopsis: "",
    tags: [],
    coverImage: "",
    chapters: [],
  });

  useEffect(() => {
    fetchStoryData();
  }, [story_id]);

  const fetchStoryData = async () => {
    try {
      setLoading(true);
      const response = await getStoryById(story_id);
      if (!response || response.length === 0) {
        throw new Error("Data story tidak ditemukan");
      }
      const data = response[0];
      setFormData({
        title: data.title || "",
        writerName: data.writer || "",
        synopsis: data.synopsis || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.cover || "",
        chapters: Array.isArray(data.chapters) ? data.chapters : [],
      });
      setSelectedCategory(data.category || "");
      setSelectedStatus(data.status || "");
      setFilePreview(data.cover);
      setLoading(false);
    } catch (err) {
      console.error("Error in fetchStoryData:", err);
      setError(err.message || "Gagal mengambil data story");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && newTag.trim()) {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploadStatus("uploading");
      let coverUrl = formData.coverImage;
      if (selectedFile) {
        const uploadedUrl = await handleImageUpload(selectedFile);
        if (uploadedUrl) {
          coverUrl = uploadedUrl;
        }
      }
      const updatedData = {
        title: formData.title,
        writer: formData.writerName,
        synopsis: formData.synopsis,
        category: selectedCategory,
        status: selectedStatus,
        tags: formData.tags,
        cover: coverUrl,
      };
      await updateStory(story_id, updatedData);
      setUploadStatus("success");
      setUploadMessage("Story updated successfully!");
      setTimeout(() => {
        navigate("/stories");
      }, 1500);
    } catch (err) {
      setUploadStatus("error");
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const result = await uploadImage(file, import.meta.env.VITE_API_KEY);
      if (result.status === "success" && result.data.downloadURL) {
        return result.data.downloadURL;
      } else {
        throw new Error("Failed to get download URL");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return formData.coverImage;
    }
  };

  return {
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
  };
};
