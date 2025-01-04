import * as StoryRepository from "../../repositories/story/StoryRepository.js";

export async function createStory(req, res) {
  try {
    const storyData = req.body || {};
    const requiredFields = [
      "title",
      "writer",
      "synopsis",
      "cover",
      "category",
      "status",
      "tags",
      "chapters",
    ];
    if (!requiredFields.every((field) => storyData[field])) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }
    const story = await StoryRepository.create(storyData);
    res.status(201).json({
      status: "success",
      message: "Story created successfully",
      data: story,
    });
  } catch (error) {
    if (error.message === "Story with this title already exists") {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
    res.status(500).json({
      status: "error",
      message: "Failed to create story",
      error: error.message,
    });
  }
}

export async function updateStory(req, res) {
  try {
    const { story_id } = req.params;
    if (!story_id ) {
      return res.status(400).json({
        status: "error",
        message: "Invalid story ID format",
      });
    }
    const storyData = req.body || {};
    const requiredFields = [
      "title",
      "writer",
      "synopsis",
      "cover",
      "category",
      "status",
      "tags",
    ];
    if (!requiredFields.every((field) => storyData[field])) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }
    await StoryRepository.update(story_id, storyData);
    res.status(200).json({
      status: "success",
      message: "Story updated successfully",
    });
  } catch (error) {
    if (error.message === "Story with this title already exists") {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
    res.status(500).json({
      status: "error",
      message: "Failed to update story",
      error: error.message,
    });
  }
}

export async function getAllStories(req, res) {
  try {
    let page = parseInt(req.query.page) || 1;
    page = page < 1 ? 1 : page;
    const result = await StoryRepository.getAll(page);
    res.status(200).json({
      status: "success",
      message: "Stories retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve stories",
      error: error.message,
    });
  }
}

export async function searchStories(req, res) {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        status: "error",
        message: "Search query is required",
      });
    }
    const stories = await StoryRepository.search(query);
    res.status(200).json({
      status: "success",
      message: "Stories found successfully",
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to search stories",
      error: error.message,
    });
  }
}

export async function deleteStories(req, res) {
  try {
    const { story_id } = req.params;
    if (!story_id) {
      return res.status(400).json({
        status: "error",
        message: "story_id is required",
      });
    }
    await StoryRepository.deleteStory(story_id);
    res.status(200).json({
      status: "success",
      message: "Stories successfully deleted",
    });
  } catch (error) {
    if (error.message === "Couldn't find story") {
      return res.status(404).json({
        status: "error",
        message: "Story not found",
      });
    }
    res.status(500).json({
      status: "error",
      message: "Failed to delete story",
      error: error.message,
    });
  }
}

export async function filterStories(req, res) {
  try {
    const { category, status } = req.query;
    if (!category && !status) {
      return res.status(400).json({
        status: "error",
        message:
          "At least one filter parameter (category or status) is required",
      });
    }
    const stories = await StoryRepository.getByFilter(category, status);
    res.status(200).json({
      status: "success",
      message: "Stories filtered successfully",
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to filter stories",
      error: error.message,
    });
  }
}
