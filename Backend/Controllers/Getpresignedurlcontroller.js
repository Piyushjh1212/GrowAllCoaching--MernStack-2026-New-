// Controllers/Getpresignedurlcontroller.js
import Lecture from "../Modals/CourseLectureModals.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../Utils/awsS3.js";

export const getPresignedURL = async (req, res) => {
  const { lectureId } = req.params;  // ✅ frontend will send lectureId now
  console.log("Requested Lecture ID:", lectureId);

  try {
    // ✅ Find lecture in DB
    const lecture = await Lecture.findById(lectureId);

    if (!lecture || !lecture.videoKey) {
      return res.status(404).json({ error: "No video key available yet" });
    }

    // ✅ Generate pre-signed URL using videoKey from lecture
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: lecture.videoKey,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    res.json({ videoURL: url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate URL" });
  }
};