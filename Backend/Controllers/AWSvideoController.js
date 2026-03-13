// backend/Controllers/AWSvideoController.js
import AWSCourseVideo from "../Modals/AwsVideoModals.js";
import { uploadToS3 } from "../Utils/Uploadtos3.js";

export const uploadVideotoAWS = async (req, res) => {
  try {
    const file = req.file; // Multer middleware se aayega

    if (!file) {
      return res.status(400).json({ success: false, message: "Video file is missing" });
    }

    // 1️⃣ Upload video to AWS S3
    // Folder inside your bucket
    const folder = "GrowAllcoachingVideos";
    const videoUrl = await uploadToS3(file.buffer, file.originalname, folder);

    // 2️⃣ Save video URL in MongoDB
    const newVideo = await AWSCourseVideo.create({
      Lecturevideo: videoUrl,
    });

    // 3️⃣ Send success response
    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video: newVideo,
      url: videoUrl, // optional: send S3 URL in response
    });

  } catch (error) {
    console.error("AWS Video Upload Error:", error.message || error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message || error,
    });
  }
};


