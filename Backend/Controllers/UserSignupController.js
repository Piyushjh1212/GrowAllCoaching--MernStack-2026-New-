// Controllers/UserSignupController.js
import UserSignup from "../Modals/UserSignupModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sanitizeHtml from "sanitize-html";
import { logSecurityEventHelper } from "../Helpers/SuspiouslogHelper.js";

// ------------------- SIGNUP -------------------
export const UserSignupController = async (req, res) => {
  try {
    // 1️⃣ Get sanitized input from middleware
    let { name, email, password, confirmPassword, profilePic } = req.sanitizedBody;

    // Sanitize to prevent XSS
    name = sanitizeHtml(name?.trim() || "");
    email = sanitizeHtml(email?.trim().toLowerCase() || "");
    password = sanitizeHtml(password?.trim() || "");
    confirmPassword = sanitizeHtml(confirmPassword?.trim() || "");

    // 2️⃣ Check for suspicious input
    if ([name, email, password, confirmPassword].some(v => v.includes("<script>"))) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "sanitize-block",
        message: "Suspicious input detected in signup"
      });
    }

    // 3️⃣ Check empty fields
    if (!name || !email || !password || !confirmPassword) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "Empty fields"
      });
      return res.status(400).json({ message: "All fields required" });
    }

    // 4️⃣ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 5️⃣ Check password match
    if (password !== confirmPassword) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "Passwords do not match"
      });
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 6️⃣ Password length check
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 7️⃣ Check if user already exists
    const userExists = await UserSignup.findOne({ email });
    if (userExists) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "User already exists"
      });
      return res.status(400).json({ message: "User already exists" });
    }

    // 8️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 9️⃣ Create user
    const user = await UserSignup.create({
      name,
      email,
      password: hashedPassword,
      profilePic
    });

    // 🔟 Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "14d" });

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: user._id,
      type: "signup-success",
      message: "User registered successfully"
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "signup-error",
      message: error.message
    });
    res.status(500).json({ message: error.message });
  }
};

// ------------------- LOGIN -------------------
export const UserLoginController = async (req, res) => {
  try {
    let { email, password } = req.sanitizedBody;

    email = sanitizeHtml(email?.trim().toLowerCase() || "");
    password = sanitizeHtml(password?.trim() || "");

    // Optional: suspicious input logging
    if ([email, password].some(v => v.includes("<script>"))) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "sanitize-block",
        message: "Suspicious input detected in login"
      });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await UserSignup.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "14d" });

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: user._id,
      type: "login-success",
      message: "User logged in successfully"
    });

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "login-error",
      message: error.message
    });
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------- GET ALL USERS -------------------
export const GatAlltheUser = async (req, res) => {
  try {
    const users = await UserSignup.find().select("-password"); // exclude passwords
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};