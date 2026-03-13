// backend/middlewares/uploadMiddleware.js
import multer from "multer";

// Memory storage: file memory me aayegi, AWS S3 ke liye best
const storage = multer.memoryStorage();

// Multer instance
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 500 }, // 500MB max size, adjust if needed
  fileFilter: (req, file, cb) => {
    // Only accept video files
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed!"), false);
    }
  },
});

// Export single video upload middleware
export const uploadVideoMiddleware = upload.single("video");