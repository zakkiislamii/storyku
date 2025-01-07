import axios from "axios";

export const updateChapter = async (chapter_id, data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_URL}/chapters/${chapter_id}`,
      data,
      {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteChapter = async (chapter_id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_URL}/chapters/${chapter_id}`,
      {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
