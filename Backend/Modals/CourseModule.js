import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  title: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});

export default mongoose.model("Module", moduleSchema);