import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
  freeLecturesCount: { type: Number, default: 5 },
});

export default mongoose.model("Course", courseSchema);