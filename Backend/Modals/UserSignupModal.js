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
<<<<<<< HEAD
    profilePic: {
      type: String,
      default: ""
    },
=======
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    purchasedModules: [
      {
        module: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModule" },
        expiryDate: Date,
      },
    ],
<<<<<<< HEAD

=======
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
  },
  { timestamps: true }
);

const User = mongoose.model("UserSignup", userSchema);

export default User;