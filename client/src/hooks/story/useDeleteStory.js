import { useState } from "react";
import { deleteChapter } from "../../services/story";

export const useDeleteStory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteStory = async (storyId, onSuccess) => {
    setLoading(true);
    try {
      const response = await deleteChapter(storyId);
      if (response.status === "success") {
        onSuccess();
      } else {
        setError("Failed to delete story");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleDeleteStory };
};
