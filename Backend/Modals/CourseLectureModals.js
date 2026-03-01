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

    // ✅ Correct Way - Array of Subtitles
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
      required: true
    },

    isFree: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Lecture", lectureSchema);