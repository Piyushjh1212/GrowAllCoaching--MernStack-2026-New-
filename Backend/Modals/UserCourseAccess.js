import mongoose from "mongoose";

const UserCourseAccessSchema = new mongoose.Schema(

    {
        userId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        courseId:
        {
            type: String
        }, // same as course field in video
        accessStart:
        {
            type: Date,
            default: Date.now
        },
        accessEnd:
        {
            type: Date,
            required: true
        }, // course validity
    },
    { timestamps: true }
);

export default mongoose.model("UserCourseAccess", UserCourseAccessSchema);