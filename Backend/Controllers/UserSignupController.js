import UserSignup from '../Modals/UserSignupModal.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sanitizeHtml from "sanitize-html";
import { logSecurityEventHelper } from '../Helpers/SuspiouslogHelper.js';

export const UserSignupController = async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.sanitizedBody;

    // Sanitize inputs to prevent XSS
    name = sanitizeHtml(name?.trim() || "");
    email = sanitizeHtml(email?.trim().toLowerCase() || "");
    password = sanitizeHtml(password?.trim() || "");
    confirmPassword = sanitizeHtml(confirmPassword?.trim() || "");

    // Optional: suspicious input logging
    if ([name, email, password, confirmPassword].some(v => v.includes("<script>"))) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "sanitize-block",
        message: "Suspicious input detected in signup"
      });
    }

    // 1️⃣ Check empty fields
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

    // 2️⃣ Check password match
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

    // 3️⃣ Check existing user
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

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const user = await UserSignup.create({ name, email, password: hashedPassword });

    // 6️⃣ Generate JWT (10s expiry)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "14D" });

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

    const user = await UserSignup.findOne({ email });
    if (!user) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "login-failed",
        message: "Invalid email"
      });
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: user._id,
        type: "login-failed",
        message: "Invalid password"
      });
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "14D" });

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

export const GatAlltheUser = async(req, res) => {

  

}