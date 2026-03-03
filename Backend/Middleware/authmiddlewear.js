import jwt from "jsonwebtoken";
import UserSignup from "../Modals/UserSignupModal.js"


export const protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ If no token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Get user from DB (optional but professional)
    req.user = await UserSignup.findById(decoded.id).select("-password");

    next(); // go to next controller

  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};