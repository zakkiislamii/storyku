import * as ChapterRepository from "../../repositories/chapter/ChapterRepository.js";
export async function updatedChapter(req, res) {
  try {
    const chapterData = req.body || {};
    const { chapter_id } = req.params;

    if (!chapter_id) {
      return res.status(400).json({
        status: "error",
        message: "Chapter ID is required",
      });
    }

    const requiredFields = ["title", "content"];
    if (!requiredFields.every((field) => chapterData[field])) {
      return res.status(400).json({
        status: "error",
        message: "Title and content are required",
      });
    }

    const updatedChapter = await ChapterRepository.update(
      chapter_id,
      chapterData
    );
    res.status(200).json({
      status: "success",
      message: "Chapter updated successfully",
      data: updatedChapter,
    });
  } catch (error) {
    if (error.message === "Chapter with this title already exists") {
      return res.status(400).json({
        status: "error",
        message: "Chapter with this title already exists",
      });
    }
    res.status(500).json({
      status: "error",
      message: "Failed to update chapter",
      error: error.message,
    });
  }
}

export async function deleteChapter(req, res) {
  try {
    const { chapter_id } = req.params;

    if (!chapter_id) {
      return res.status(400).json({
        status: "error",
        message: "Chapter ID is required",
      });
    }

    await ChapterRepository.deleteChapter(chapter_id);
    res.status(200).json({
      status: "success",
      message: "Chapter deleted successfully",
    });
  } catch (error) {
    if (error.message === "Chapter not found") {
      return res.status(404).json({
        status: "error",
        message: "Chapter not found",
      });
    }
    res.status(500).json({
      status: "error",
      message: "Failed to delete chapter",
      error: error.message,
    });
  }
}

export async function getAll(req, res) {
  try {
    const { story_id } = req.params;

    if (!story_id) {
      return res.status(400).json({
        status: "error",
        message: "Chapter ID is required",
      });
    }

    const chapters = await ChapterRepository.getAll(story_id);
    res.status(200).json({
      status: "success",
      message: "Chapters retrieved successfully",
      data: chapters,
    });
  } catch (error) {
    if (error.message === "Chapter not found") {
      return res.status(404).json({
        status: "error",
        message: "Chapter not found",
      });
    }
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve chapters",
      error: error.message,
    });
  }
}
