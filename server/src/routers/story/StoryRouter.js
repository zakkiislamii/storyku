import { Router } from "express";
import * as StoryController from "../../controllers/story/StoryController.js";

const storyRouter = Router();

storyRouter.post("/", StoryController.createStory);
storyRouter.put("/:story_id", StoryController.updateStory);
storyRouter.delete("/:story_id", StoryController.deleteStory);
storyRouter.get("/", StoryController.getAllStories);
storyRouter.get("/search", StoryController.searchStories);
storyRouter.get("/filter", StoryController.filterStories);

export default storyRouter;
