// controllers/imageController.js
import CourseCloudinaryImage from "../Modals/CloudinaryModuleAdd.js";
import CourseCloudinaryVideo from "../Modals/CloudinaryVideoModals.js";

// Controller to save uploaded image to DB (courseId optional removed)
export const addCloudinaryimage = async (req, res) => {
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

export const addCloudinaryVideo = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Video file missing" });
    }

    // Agar DB me save karna hai:
    const newVideo = await CourseCloudinaryVideo.create({
      Modulevideo: req.file.path
    });

    res.status(201).json({
      success: true,
      url: req.file.path,
      video: newVideo
    });

  } catch (error) {
    console.error("Video upload error:", error);
    res.status(500).json({ message: error.message });
  }
};


