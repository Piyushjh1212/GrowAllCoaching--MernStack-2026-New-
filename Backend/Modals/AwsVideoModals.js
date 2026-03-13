import mongoose from "mongoose";

const AWSCourseVideoSchema = new mongoose.Schema(
    {
        Lecturevideo:
        {
            type: String,
            required: true
        }, // S3 key
        uploadDate:
        {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("AWSCourseVideo", AWSCourseVideoSchema);