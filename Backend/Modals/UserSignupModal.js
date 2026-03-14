import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: ""
    },
    purchasedModules: [
      {
        module: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModule" },
        expiryDate: Date,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("UserSignup", userSchema);

export default User;