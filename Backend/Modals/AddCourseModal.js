import mongoose from "mongoose";

const AddCourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Course title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Course description is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Course price is required"],
        min: [0, "Price cannot be negative"]
    },
    image: {
        type: String,
        required: [true, "Course image URL is required"],
        trim: true,
    },
    freeLecturesCount: {
        type: Number,
        default: 5,
        min: [0, "Free lectures count cannot be negative"]
    }
}, {
    timestamps: true
});

export default mongoose.model("Course", AddCourseSchema);