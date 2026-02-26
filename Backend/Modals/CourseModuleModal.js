import mongoose from "mongoose";

const courseModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
}, {
    timestamps: true

});

export default mongoose.model("CourseModule", courseModuleSchema);