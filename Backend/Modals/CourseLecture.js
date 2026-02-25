import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  isFree: { type: Boolean, default: false },
});

export default mongoose.model("Lecture", lectureSchema);