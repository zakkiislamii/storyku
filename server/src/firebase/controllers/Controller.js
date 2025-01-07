import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { sendResponse } from "../../utils/ResponseHandler.js";
import { app } from "../config/FirebaseConfig.js";

const storage = getStorage(app);

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return sendResponse(res, {
        status: false,
        code: 400,
        message: "No file uploaded",
      });
    }
    if (req.file.size > 2 * 1024 * 1024) {
      return sendResponse(res, {
        status: false,
        code: 400,
        message: "File size exceeds 2MB limit",
      });
    }
    if (!req.file.mimetype.startsWith("image/")) {
      return sendResponse(res, {
        status: false,
        code: 400,
        message: "Only image files are allowed",
      });
    }
    const dateTime = new Date().getTime();
    const fileName = `images/${dateTime}_${req.file.originalname}`;
    const storageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(storageRef, req.file.buffer, {
      contentType: req.file.mimetype,
    });
    const downloadURL = await getDownloadURL(snapshot.ref);
    return sendResponse(res, {
      message: "File uploaded successfully",
      data: {
        fileName: fileName,
        downloadURL: downloadURL,
      },
    });
  } catch (error) {
    return sendResponse(res, {
      status: false,
      code: 500,
      message: "Error uploading file",
      error: error.message,
    });
  }
};
