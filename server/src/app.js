import express from "express";
import storyRouter from "./routers/story/StoryRouter.js";
import { validateApiKey } from "./middlewares/ValidateApiKey.js";
import chapterRouter from "./routers/chapter/ChapterRouter.js";

const app = express();
const port = process.env.PORT;
const url = process.env.URL;

app.use(express.json());
app.use(validateApiKey);
app.use("/api/stories", storyRouter);
app.use("/api/chapters", chapterRouter);

app.listen(port, () => {
  console.log(`Server is running on ${url}:${port}`);
});
