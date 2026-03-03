import mongoose from "mongoose";

const CreateRazorpayPayment = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSignup",
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  amount: Number,
  status: {
    type: String,
    default: "pending"
  },
  expiryDate: { // ✅ naya field
    type: Date
  }
}, { timestamps: true });

export default mongoose.model("Payment", CreateRazorpayPayment);