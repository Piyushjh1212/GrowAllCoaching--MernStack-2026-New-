// models/Lecture.js
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModule",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

<<<<<<< HEAD
=======
    // ✅ Correct Way - Array of Subtitles
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    subtitles: [
      {
        type: String,
        trim: true
      }
    ],

    duration: {
      type: String,
      default: "00:00"
    },

    completed: {
      type: Boolean,
      default: false
    },

    videoUrl: {
      type: String,
<<<<<<< HEAD
      required: false // optional now, because we'll fetch via presigned URL
    },

    videoKey: {
      type: String,
      required: false // this is the S3 key for pre-signed URL
=======
      required: true
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    },

    isFree: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Lecture", lectureSchema);