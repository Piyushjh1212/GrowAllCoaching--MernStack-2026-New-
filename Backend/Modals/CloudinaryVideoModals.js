import mongoose from "mongoose";

const courseVideoSchema = new mongoose.Schema({
    Modulevideo:
    {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);

export default mongoose.model("CourseCloudinaryVideo", courseVideoSchema);