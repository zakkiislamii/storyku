import { Router } from "express";
import * as ChapterController from "../../controllers/chapter/ChapterController.js";

const chapterRouter = Router();

chapterRouter.put("/:chapter_id", ChapterController.updatedChapter);
chapterRouter.delete("/:chapter_id", ChapterController.deleteChapter);
chapterRouter.get("/:story_id", ChapterController.getAll);

export default chapterRouter;
