import * as ChapterRepository from "../../repositories/chapter/ChapterRepository.js";
import { sendResponse } from "../../utils/ResponseHandler.js";
import {
  deleteSchema,
  getAllByIdSchema,
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
          status: false,
          code: 400,
          message: error.message,
        });
      }

      return sendResponse(res, {
        status: false,
        code: 500,
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
          status: false,
          code: 404,
          message: error.message,
        });
      }

      return sendResponse(res, {
        status: false,
        code: 500,
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
          status: false,
          code: 404,
          message: error.message,
        });
      }

      return sendResponse(res, {
        status: false,
        code: 500,
        message: "Failed to retrieve chapters",
        error: error.message,
      });
    }
  },
];

export const getAllChaptersById = [
  ValidateChapter(getAllByIdSchema),
  async (req, res) => {
    try {
      const { chapter_id } = req.params;
      const chapters = await ChapterRepository.getAllById(chapter_id);
      return sendResponse(res, {
        message: "Chapters retrieved successfully",
        data: chapters,
      });
    } catch (error) {
      if (error.message === "Chapter not found") {
        return sendResponse(res, {
          status: false,
          code: 404,
          message: error.message,
        });
      }

      return sendResponse(res, {
        status: false,
        code: 500,
        message: "Failed to retrieve chapters",
        error: error.message,
      });
    }
  },
];
