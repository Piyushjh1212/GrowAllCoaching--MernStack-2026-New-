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
      required: false // optional now, because we'll fetch via presigned URL
    },

    videoKey: {
      type: String,
      required: false // this is the S3 key for pre-signed URL
    },

    isFree: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Lecture", lectureSchema);