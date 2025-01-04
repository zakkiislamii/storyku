import { jest } from "@jest/globals";

const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockGetAll = jest.fn();
const mockSearch = jest.fn();
const mockGetByFilter = jest.fn();
const mockDeleteStory = jest.fn();

jest.unstable_mockModule("../repositories/story/StoryRepository.js", () => ({
  create: mockCreate,
  update: mockUpdate,
  getAll: mockGetAll,
  search: mockSearch,
  getByFilter: mockGetByFilter,
  deleteStory: mockDeleteStory,
  default: {
    create: mockCreate,
    update: mockUpdate,
    getAll: mockGetAll,
    search: mockSearch,
    getByFilter: mockGetByFilter,
    deleteStory: mockDeleteStory,
  },
}));

const {
  createStory,
  updateStory,
  getAllStories,
  searchStories,
  filterStories,
  deleteStories,
} = await import("../controllers/story/StoryController.js");

describe("Story", () => {
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

  describe("createStory", () => {
    const mockStoryData = {
      title: "Test Story",
      writer: "Test writer",
      synopsis: "Test Synopsis",
      category: "financial",
      cover: "test-cover.jpg",
      tags: ["test", "story"],
      status: "publish",
      chapters: [
        {
          title: "Chapter 1",
          content: "Chapter 1 content",
        },
      ],
    };

    test("should create a story successfully", async () => {
      mockRequest.body = mockStoryData;
      mockCreate.mockResolvedValueOnce(mockStoryData);
      await createStory(mockRequest, mockResponse);
      expect(mockCreate).toHaveBeenCalledWith(mockStoryData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Story created successfully",
        data: mockStoryData,
      });
    });

    test("should return 400 if story data is missing", async () => {
      mockRequest.body = null;
      await createStory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "All fields are required",
      });
    });

    test("should handle errors during story creation", async () => {
      mockRequest.body = mockStoryData;
      const error = new Error("Database error");
      mockCreate.mockRejectedValueOnce(error);
      await createStory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Failed to create story",
        error: error.message,
      });
    });

    test("should validate required fields", async () => {
      const invalidData = {
        title: "Test Story",
      };
      mockRequest.body = invalidData;
      const error = new Error("Missing required fields");
      mockCreate.mockRejectedValueOnce(error);
      await createStory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe("updateStory", () => {
    const mockStoryData = {
      title: "Updated Story",
      writer: "Updated writer",
      synopsis: "Updated Synopsis",
      category: "financial",
      cover: "updated-cover.jpg",
      tags: ["updated"],
      status: "publish",
    };
    test("should update a story successfully", async () => {
      mockRequest.params = { story_id: "1" };
      mockRequest.body = mockStoryData;
      mockUpdate.mockResolvedValueOnce(mockStoryData);
      await updateStory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Story updated successfully",
      });
    });

    test("should handle invalid ID format", async () => {
      mockRequest.params = {};
      mockRequest.body = mockStoryData;
      await updateStory(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Invalid story ID format",
      });
    });
  });

  describe("getAllStories", () => {
    const mockStoriesResponse = {
      stories: [{ id: 1, title: "Story 1" }],
      totalPages: 3,
      currentPage: 2,
      totalStories: 25,
    };

    test("should get all stories successfully with pagination", async () => {
      mockRequest.query = { page: "2" };
      mockGetAll.mockResolvedValueOnce(mockStoriesResponse);

      await getAllStories(mockRequest, mockResponse);

      expect(mockGetAll).toHaveBeenCalledWith(2);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Stories retrieved successfully",
        data: mockStoriesResponse,
      });
    });

    test("should handle negative page number", async () => {
      mockRequest.query = { page: "-1" };
      const defaultResponse = { ...mockStoriesResponse, currentPage: 1 };
      mockGetAll.mockResolvedValueOnce(defaultResponse);
      await getAllStories(mockRequest, mockResponse);
      expect(mockGetAll).toHaveBeenCalledWith(1);
    });
  });

  describe("searchStories", () => {
    test("should return empty array when no stories found", async () => {
      mockRequest.query = { query: "nonexistent" };
      mockSearch.mockResolvedValueOnce([]);
      await searchStories(mockRequest, mockResponse);
      expect(mockSearch).toHaveBeenCalledWith("nonexistent");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Stories found successfully",
        data: [],
      });
    });
  });

  describe("filterStories", () => {
    test("should validate category enum values", async () => {
      mockRequest.query = { category: "invalid_category" };
      const error = new Error("Invalid category");
      mockGetByFilter.mockRejectedValueOnce(error);
      await filterStories(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
    test("should validate status enum values", async () => {
      mockRequest.query = { status: "invalid_status" };
      const error = new Error("Invalid status");
      mockGetByFilter.mockRejectedValueOnce(error);
      await filterStories(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });

  describe("deleteStories", () => {
    test("should delete a story successfully", async () => {
      mockRequest.params = { story_id: "123" };
      await deleteStories(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        message: "Stories successfully deleted",
      });
    });

    test("should return 400 if story_id is missing", async () => {
      mockRequest.params = {};
      await deleteStories(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "story_id is required",
      });
    });

    test("should return 404 if story is not found", async () => {
      mockRequest.params = { story_id: "999" };
      const error = new Error("Couldn't find story");
      mockDeleteStory.mockRejectedValueOnce(error);
      await deleteStories(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Story not found",
      });
    });

    test("should handle unexpected errors", async () => {
      mockRequest.params = { story_id: "123" };
      const error = new Error("Database error");
      mockDeleteStory.mockRejectedValueOnce(error);
      await deleteStories(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        message: "Failed to delete story",
        error: error.message,
      });
    });
  });
});
