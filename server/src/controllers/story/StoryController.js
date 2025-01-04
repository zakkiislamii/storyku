import * as StoryRepository from "../../repositories/story/StoryRepository.js";
import { sendResponse } from "../../utils/ResponseHandler.js";
import {
  createSchema,
  updateSchema,
  deleteSchema,
  getAllSchema,
  searchSchema,
  filterSchema,
} from "../../validators/schema/story/StorySchema.js";
import { ValidateChapter } from "../../validators/ValidateChapter.js";

export const createStory = [
  ValidateChapter(createSchema),
  async (req, res) => {
    try {
      const storyData = req.body;
      const story = await StoryRepository.create(storyData);
      return sendResponse(res, {
        status: 201,
        message: "Story created successfully",
        data: story,
      });
    } catch (error) {
      if (error.message === "Story with this title already exists") {
        return sendResponse(res, {
          status: 400,
          success: false,
          message: error.message,
        });
      }
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Failed to create story",
        error: error.message,
      });
    }
  },
];

export const updateStory = [
  ValidateChapter(updateSchema),
  async (req, res) => {
    try {
      const { story_id } = req.params;
      const storyData = req.body;
      await StoryRepository.update(story_id, storyData);
      return sendResponse(res, {
        message: "Story updated successfully",
      });
    } catch (error) {
      if (error.message === "Story with this title already exists") {
        return sendResponse(res, {
          status: 400,
          success: false,
          message: error.message,
        });
      }
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Failed to update story",
        error: error.message,
      });
    }
  },
];

export const getAllStories = [
  ValidateChapter(getAllSchema),
  async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const result = await StoryRepository.getAll(page);
      return sendResponse(res, {
        message: "Stories retrieved successfully",
        data: result,
      });
    } catch (error) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Failed to retrieve stories",
        error: error.message,
      });
    }
  },
];

export const searchStories = [
  ValidateChapter(searchSchema),
  async (req, res) => {
    try {
      const { query } = req.query;
      const stories = await StoryRepository.search(query);
      return sendResponse(res, {
        message: "Stories found successfully",
        data: stories,
      });
    } catch (error) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Failed to search stories",
        error: error.message,
      });
    }
  },
];

export const deleteStory = [
  ValidateChapter(deleteSchema),
  async (req, res) => {
    try {
      const { story_id } = req.params;
      await StoryRepository.deleteStory(story_id);
      return sendResponse(res, {
        message: "Story deleted successfully",
      });
    } catch (error) {
      if (error.message === "Couldn't find story") {
        return sendResponse(res, {
          status: 404,
          success: false,
          message: "Story not found",
        });
      }
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Failed to delete story",
        error: error.message,
      });
    }
  },
];

export const filterStories = [
  ValidateChapter(filterSchema),
  async (req, res) => {
    try {
      const { category, status } = req.query;
      const stories = await StoryRepository.getByFilter(category, status);
      return sendResponse(res, {
        message: "Stories filtered successfully",
        data: stories,
      });
    } catch (error) {
      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Failed to filter stories",
        error: error.message,
      });
    }
  },
];
