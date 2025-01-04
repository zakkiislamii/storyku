import { jest } from "@jest/globals";

const mockUpdate = jest.fn();
const mockGetAll = jest.fn();
const mockDeleteChapter = jest.fn();

jest.unstable_mockModule(
  "../repositories/chapter/ChapterRepository.js",
  () => ({
    update: mockUpdate,
    getAll: mockGetAll,
    deleteChapter: mockDeleteChapter,
    default: {
      update: mockUpdate,
      getAll: mockGetAll,
      deleteChapter: mockDeleteChapter,
    },
  })
);

const { updatedChapter, getAll, deleteChapter } = await import(
  "../controllers/chapter/ChapterController.js"
);

describe("Chapter", () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      body: {},
      params: {},
      query: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("update chapter", () => {
    const mockChapterData = {
      title: "Updated Chapter Title",
      content: "Updated chapter content",
    };

    test("should update chapter successfully", async () => {
      mockRequest.params = { chapter_id: "123" };
      mockRequest.body = mockChapterData;
      mockUpdate.mockResolvedValueOnce(mockChapterData);
      await updatedChapter(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Chapter updated successfully",
      });
    });

    test("should return 400 if chapter_id is missing", async () => {
      mockRequest.body = mockChapterData;

      await updatedChapter(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Chapter ID is required",
      });
    });

    test("should return 400 if required fields are missing", async () => {
      mockRequest.params = { chapter_id: "123" };
      mockRequest.body = { title: "Title only" };

      await updatedChapter(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Title and content are required",
      });
    });

    test("should handle duplicate title error", async () => {
      mockRequest.params = { chapter_id: "123" };
      mockRequest.body = mockChapterData;
      const error = new Error("Chapter with this title already exists");
      mockUpdate.mockRejectedValueOnce(error);

      await updatedChapter(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Chapter with this title already exists",
      });
    });
  });

  describe("get all chapter", () => {
    const mockChapters = [
      { id: "1", title: "Chapter 1", content: "Content 1" },
      { id: "2", title: "Chapter 2", content: "Content 2" },
    ];

    test("should get all chapters successfully", async () => {
      mockRequest.params = { story_id: "123" };
      mockGetAll.mockResolvedValueOnce(mockChapters);

      await getAll(mockRequest, mockResponse);

      expect(mockGetAll).toHaveBeenCalledWith("123");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Chapters retrieved successfully",
        data: mockChapters,
      });
    });

    test("should return 400 if story_id is missing", async () => {
      await getAll(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Chapter ID is required",
      });
    });

    test("should handle not found error", async () => {
      mockRequest.params = { story_id: "999" };
      const error = new Error("Chapter not found");
      mockGetAll.mockRejectedValueOnce(error);

      await getAll(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Chapter not found",
      });
    });
  });

  describe("delete chapter", () => {
    test("should delete chapter successfully", async () => {
      mockRequest.params = { chapter_id: "123" };

      await deleteChapter(mockRequest, mockResponse);

      expect(mockDeleteChapter).toHaveBeenCalledWith("123");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Chapter deleted successfully",
      });
    });

    test("should return 400 if chapter_id is missing", async () => {
      await deleteChapter(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Chapter ID is required",
      });
    });

    test("should return 404 if chapter not found", async () => {
      mockRequest.params = { chapter_id: "999" };
      const error = new Error("Chapter not found");
      mockDeleteChapter.mockRejectedValueOnce(error);

      await deleteChapter(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Chapter not found",
      });
    });

    test("should handle unexpected errors", async () => {
      mockRequest.params = { chapter_id: "123" };
      const error = new Error("Database error");
      mockDeleteChapter.mockRejectedValueOnce(error);

      await deleteChapter(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Failed to delete chapter",
        error: error.message,
      });
    });
  });
});
