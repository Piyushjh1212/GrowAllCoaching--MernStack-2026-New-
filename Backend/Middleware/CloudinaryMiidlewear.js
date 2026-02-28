// middleware/upload.js
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../Config/ConfigCloudinary.js";

// Image storage
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "GacImages",      // Images folder
    resource_type: "image",    // Only images
  }
});

// Video storage
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "GacVideos",      // Videos folder
    resource_type: "video",    // Only videos
  }
});

// Multer instances
export const imageParser = multer({ storage: imageStorage }); // use for images
export const videoParser = multer({ storage: videoStorage }); // use for videos