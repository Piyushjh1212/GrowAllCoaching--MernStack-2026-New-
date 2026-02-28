// controllers/imageController.js
import CourseCloudinaryImage from "../Modals/CloudinaryModuleAdd.js";

// Controller to save uploaded image to DB (courseId optional removed)
export const addCloudinaryImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image file missing" });
    }

    // Save Cloudinary URL to MongoDB
    const newImage = await CourseCloudinaryImage.create({
      Moduleimage: req.file.path // Cloudinary URL handled by Multer
    });

    res.status(201).json({ success: true, url: req.file.path, image: newImage });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ message: error.message });
  }
};