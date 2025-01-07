import { useState, useEffect } from "react";
import { updateChapter, deleteChapter } from "../../services/chapter";
import {
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";

export const useChapter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (location.state?.chapter) {
      const { title, content } = location.state.chapter;
      setFormData({ title, content });
    }
  }, [location.state]);

  const handleUpdateChapter = async (chapterId, data) => {
    setLoading(true);
    try {
      const response = await updateChapter(chapterId, data);
      if (response.status === "success") {
        navigate(-1);
        return true;
      }
      throw new Error(response.message || "Failed to update chapter");
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    setLoading(true);
    try {
      const response = await deleteChapter(chapterId);
      if (response.status === "success") {
        window.location.reload();
        return true;
      }
      throw new Error(response.message || "Failed to delete chapter");
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    formData,
    setFormData,
    handleUpdateChapter,
    handleDeleteChapter,
  };
};
