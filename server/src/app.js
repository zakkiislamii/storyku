import express from "express";
import cors from "cors"; // Import cors
import storyRouter from "./routers/story/StoryRouter.js";
import { validateApiKey } from "./middlewares/ValidateApiKey.js";
import chapterRouter from "./routers/chapter/ChapterRouter.js";

const app = express();
const url = process.env.URL;
const port = 3006;
const allowedOrigins = ["http://localhost:5173", "http://localhost:3006"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(validateApiKey);
app.use("/api/stories", storyRouter);
app.use("/api/chapters", chapterRouter);

app.listen(port, () => {
  console.log(`Server is running on ${url}`);
});
