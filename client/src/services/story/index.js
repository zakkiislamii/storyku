import axios from "axios";

export const uploadImage = async (file, apiKey) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_URL}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": apiKey || import.meta.env.VITE_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStory = async (storyData, apiKey) => {
  const response = await axios.post(
    `${import.meta.env.VITE_URL}/stories`,
    storyData,
    {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const fetchStoriesAPI = async (currentPage, searchQuery, filters) => {
  let endpoint = `${import.meta.env.VITE_URL}/stories`;
  if (searchQuery) {
    endpoint = `${endpoint}/search?query=${searchQuery}`;
  } else if (filters.category || filters.status) {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.status) params.append("status", filters.status);
    endpoint = `${endpoint}/filter?${params.toString()}`;
  } else {
    endpoint = `${endpoint}?page=${currentPage}`;
  }
  const response = await axios.get(endpoint, {
    headers: { "x-api-key": import.meta.env.VITE_API_KEY },
  });
  return {
    stories: response.data.data.stories || response.data.data,
    totalPages: response.data.data.totalPages || 1,
  };
};

export const getStoryById = async (storyId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/stories/by_id/${storyId}`,
      {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error in getStoryById:", error);
    throw error;
  }
};

export const updateStory = async (storyId, storyData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_URL}/stories/${storyId}`,
      storyData,
      { headers: { "x-api-key": import.meta.env.VITE_API_KEY } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteChapter = async (storyId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_URL}/stories/${storyId}`,
      {
        headers: { "x-api-key": import.meta.env.VITE_API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
