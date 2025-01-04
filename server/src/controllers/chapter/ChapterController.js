import * as ChapterRepository from "../../repositories/chapter/ChapterRepository.js";
import { sendResponse } from "../../utils/ResponseHandler.js";
import {
  deleteSchema,
  getAllSchema,
  updateSchema,
} from "../../validators/schema/chapter/ChapterSchema.js";
import { ValidateChapter } from "../../validators/ValidateChapter.js";

export const updateChapter = [
  ValidateChapter(updateSchema),
  async (req, res) => {
    try {
      const { chapter_id } = req.params;
      const chapterData = req.body;
      await ChapterRepository.update(chapter_id, chapterData);
      return sendResponse(res, {
        message: "Chapter updated successfully",
      });
    } catch (error) {
      if (error.message === "Chapter with this title already exists") {
        return sendResponse(res, {
          status: 400,
          success: false,
          message: error.message,
        });
      }

      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Failed to update chapter",
        error: error.message,
      });
    }
  },
];

export const deleteChapter = [
  ValidateChapter(deleteSchema),
  async (req, res) => {
    try {
      const { chapter_id } = req.params;
      await ChapterRepository.deleteChapter(chapter_id);
      return sendResponse(res, {
        message: "Chapter deleted successfully",
      });
    } catch (error) {
      if (error.message === "Chapter not found") {
        return sendResponse(res, {
          status: 404,
          success: false,
          message: error.message,
        });
      }

      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Failed to delete chapter",
        error: error.message,
      });
    }
  },
];

export const getAllChapters = [
  ValidateChapter(getAllSchema),
  async (req, res) => {
    try {
      const { story_id } = req.params;

      const chapters = await ChapterRepository.getAll(story_id);
      return sendResponse(res, {
        message: "Chapters retrieved successfully",
        data: chapters,
      });
    } catch (error) {
      if (error.message === "Chapter not found") {
        return sendResponse(res, {
          status: 404,
          success: false,
          message: error.message,
        });
      }

      return sendResponse(res, {
        status: 500,
        success: false,
        message: "Failed to retrieve chapters",
        error: error.message,
      });
    }
  },
];
