import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
{
    comment: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSignup",
        required: true
    },

    lectureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
        required: true
    }

},
{
    timestamps: true
}
);

const Comment = mongoose.model("CourseComment", commentSchema);

export default Comment;