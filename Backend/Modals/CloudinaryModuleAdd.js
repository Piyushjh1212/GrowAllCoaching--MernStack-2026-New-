import mongoose from "mongoose";

const courseImageSchema = new mongoose.Schema({
  Moduleimage: {
    type: String,
    required: true // image URL zaroori hai
  },
}, { timestamps: true });

export default mongoose.model("CourseCloudinaryImage", courseImageSchema);