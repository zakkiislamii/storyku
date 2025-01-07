import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/Controller.js";

const firebaseRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

firebaseRouter.post("/upload", upload.single("image"), uploadImage);

export default firebaseRouter;
