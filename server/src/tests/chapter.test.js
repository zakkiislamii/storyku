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

const { updateChapter, getAllChapters, deleteChapter } = await import(
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
      await updateChapter[1](mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        code: 200,
        message: "Chapter updated successfully",
      });
    });

    test("should handle duplicate title error", async () => {
      mockRequest.params = { chapter_id: "123" };
      mockRequest.body = mockChapterData;
      const error = new Error("Chapter with this title already exists");
      mockUpdate.mockRejectedValueOnce(error);
      await updateChapter[1](mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        code: 400,
        message: "Chapter with this title already exists",
      });
    });

    test("should handle unexpected errors", async () => {
      mockRequest.params = { chapter_id: "123" };
      mockRequest.body = mockChapterData;
      const error = new Error("Database error");
      mockUpdate.mockRejectedValueOnce(error);
      await updateChapter[1](mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        code: 500,
        message: "Failed to update chapter",
        error: "Database error",
      });
    });
  });

  describe("get all chapters", () => {
    const mockChapters = [
      { id: "1", title: "Chapter 1", content: "Content 1" },
      { id: "2", title: "Chapter 2", content: "Content 2" },
    ];

    test("should get all chapters successfully", async () => {
      mockRequest.params = { story_id: "123" };
      mockGetAll.mockResolvedValueOnce(mockChapters);
      await getAllChapters[1](mockRequest, mockResponse);
      expect(mockGetAll).toHaveBeenCalledWith("123");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        code: 200,
        message: "Chapters retrieved successfully",
        data: mockChapters,
      });
    });

    test("should handle not found error", async () => {
      mockRequest.params = { story_id: "999" };
      const error = new Error("Chapter not found");
      mockGetAll.mockRejectedValueOnce(error);
      await getAllChapters[1](mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        code: 404,
        message: "Chapter not found",
      });
    });
  });

  describe("delete chapter", () => {
    test("should delete chapter successfully", async () => {
      mockRequest.params = { chapter_id: "123" };
      await deleteChapter[1](mockRequest, mockResponse);
      expect(mockDeleteChapter).toHaveBeenCalledWith("123");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        code: 200,
        message: "Chapter deleted successfully",
      });
    });

    test("should handle not found error", async () => {
      mockRequest.params = { chapter_id: "999" };
      const error = new Error("Chapter not found");
      mockDeleteChapter.mockRejectedValueOnce(error);
      await deleteChapter[1](mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        code: 404,
        message: "Chapter not found",
      });
    });
  });
});
