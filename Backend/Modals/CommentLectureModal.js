// models/Comment.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    lectureId:
    {
        type: String,
        required: true
    },
    userName: {
        type: String, required: true
    },
    content:
    {
        type: String,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model("Comment", commentSchema);