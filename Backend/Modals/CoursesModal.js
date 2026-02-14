import mongoose from 'mongoose';

const CoursesProductsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  status: {
    type: String,
    enum: ["unlocked", "in-progress", "completed"],
    default: "unlocked"
  },
  purchaseDate: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CoursesProducts = mongoose.model('CoursesProducts', CoursesProductsSchema);

export default CoursesProducts;
