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
  deleteStory,
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
      await createStory[1](mockRequest, mockResponse);
      expect(mockCreate).toHaveBeenCalledWith(mockStoryData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        code: 201,
        message: "Story created successfully",
        data: mockStoryData,
      });
    });

    test("should handle duplicate title error", async () => {
      mockRequest.body = mockStoryData;
      const error = new Error("Story with this title already exists");
      mockCreate.mockRejectedValueOnce(error);
      await createStory[1](mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        code: 400,
        message: "Story with this title already exists",
      });
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
      await updateStory[1](mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        code: 200,
        message: "Story updated successfully",
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
      await getAllStories[1](mockRequest, mockResponse);
      expect(mockGetAll).toHaveBeenCalledWith(2);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        code: 200,
        message: "Stories retrieved successfully",
        data: mockStoriesResponse,
      });
    });
  });

  describe("searchStories", () => {
    test("should return empty array when no stories found", async () => {
      mockRequest.query = { query: "nonexistent" };
      mockSearch.mockResolvedValueOnce([]);
      await searchStories[1](mockRequest, mockResponse);
      expect(mockSearch).toHaveBeenCalledWith("nonexistent");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        code: 200,
        message: "Stories found successfully",
        data: [],
      });
    });
  });

  describe("filterStories", () => {
    const mockFilteredStories = [
      { id: 1, title: "Story 1", category: "financial" },
    ];

    test("should filter stories successfully", async () => {
      mockRequest.query = { category: "financial" };
      mockGetByFilter.mockResolvedValueOnce(mockFilteredStories);
      await filterStories[1](mockRequest, mockResponse);
      expect(mockGetByFilter).toHaveBeenCalledWith("financial", undefined);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        code: 200,
        message: "Stories filtered successfully",
        data: mockFilteredStories,
      });
    });
  });

  describe("deleteStory", () => {
    test("should delete a story successfully", async () => {
      mockRequest.params = { story_id: "123" };
      await deleteStory[1](mockRequest, mockResponse);
      expect(mockDeleteStory).toHaveBeenCalledWith("123");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "success",
        code: 200,
        message: "Story deleted successfully",
      });
    });

    test("should handle not found error", async () => {
      mockRequest.params = { story_id: "999" };
      const error = new Error("Couldn't find story");
      mockDeleteStory.mockRejectedValueOnce(error);
      await deleteStory[1](mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "error",
        code: 404,
        message: "Story not found",
      });
    });
  });
});
