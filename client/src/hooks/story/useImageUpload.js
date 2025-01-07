import { useState } from "react";
import { uploadImage } from "../../services/story";

export const useImageUpload = () => {
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const uploadCoverImage = async () => {
    if (!selectedFile) return null;

    try {
      setUploadStatus("uploading");
      const result = await uploadImage(
        selectedFile,
        import.meta.env.VITE_API_KEY
      );

      if (result.status === "success") {
        setUploadStatus("success");
        setUploadMessage("Image uploaded successfully");
        return result.data.downloadURL;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setUploadStatus("error");
      setError(error.message || "Failed to upload image");
      return null;
    }
  };

  return {
    uploadStatus,
    uploadMessage,
    filePreview,
    selectedFile,
    error,
    handleFileChange,
    uploadCoverImage,
  };
};
