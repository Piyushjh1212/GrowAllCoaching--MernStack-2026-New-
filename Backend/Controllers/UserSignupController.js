<<<<<<< HEAD
import UserSignup from "../Modals/UserSignupModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logSecurityEventHelper } from "../Helpers/SuspiouslogHelper.js";

export const UserSignupController = async (req, res) => {
  try {

    // 1️⃣ Raw input (attack detection)
    const rawData = req.body;

    const suspiciousPattern = /<script|onerror|onload|javascript:/i;

    if (Object.values(rawData).some(v => typeof v === "string" && suspiciousPattern.test(v))) {
=======
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
<<<<<<< HEAD
        type: "xss-attempt",
        message: "Suspicious XSS attempt detected"
      });
    }

    // 2️⃣ Use sanitized data from middleware
    const { name, email, password, confirmPassword, profilePic } = req.sanitizedBody;

    // 3️⃣ Empty fields
    if (!name || !email || !password || !confirmPassword) {

=======
        type: "sanitize-block",
        message: "Suspicious input detected in signup"
      });
    }

    // 1️⃣ Check empty fields
    if (!name || !email || !password || !confirmPassword) {
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "Empty fields"
      });
<<<<<<< HEAD

      return res.status(400).json({
        message: "All fields required"
      });
    }

    // 4️⃣ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      return res.status(400).json({
        message: "Invalid email format"
      });

    }

    // 5️⃣ Password match
    if (password !== confirmPassword) {

=======
      return res.status(400).json({ message: "All fields required" });
    }

    // 2️⃣ Check password match
    if (password !== confirmPassword) {
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "Passwords do not match"
      });
<<<<<<< HEAD

      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    // 6️⃣ Password policy
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    // 7️⃣ Check existing user
    const userExists = await UserSignup.findOne({ email });

    if (userExists) {

=======
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 3️⃣ Check existing user
    const userExists = await UserSignup.findOne({ email });
    if (userExists) {
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "User already exists"
      });
<<<<<<< HEAD

      return res.status(400).json({
        message: "User already exists"
      });
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
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );
=======
      return res.status(400).json({ message: "User already exists" });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const user = await UserSignup.create({ name, email, password: hashedPassword });

    // 6️⃣ Generate JWT (10s expiry)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "14D" });
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c

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
<<<<<<< HEAD
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

=======
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "signup-error",
      message: error.message
    });
<<<<<<< HEAD

    res.status(500).json({
      message: error.message
    });
=======
    res.status(500).json({ message: error.message });
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
  }
};


<<<<<<< HEAD

export const UserLoginController = async (req, res) => {

  try {

    // 1️⃣ Raw attack detection
    const suspiciousPattern = /<script|onerror|onload|javascript:/i;

    if (Object.values(req.sanitizedBody).some(v => typeof v === "string" && suspiciousPattern.test(v))) {

=======
export const UserLoginController = async (req, res) => {
  try {
    let { email, password } = req.sanitizedBody;

    email = sanitizeHtml(email?.trim().toLowerCase() || "");
    password = sanitizeHtml(password?.trim() || "");

    // Optional: suspicious input logging
    if ([email, password].some(v => v.includes("<script>"))) {
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
<<<<<<< HEAD
        type: "xss-attempt",
        message: "Suspicious XSS attempt detected in login"
      });

    }

    // 2️⃣ Sanitized data
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    // 3️⃣ Find user
    const user = await UserSignup.findOne({ email });

    if (!user) {

=======
        type: "sanitize-block",
        message: "Suspicious input detected in login"
      });
    }

    const user = await UserSignup.findOne({ email });
    if (!user) {
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "login-failed",
        message: "Invalid email"
      });
<<<<<<< HEAD

      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 4️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

=======
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: user._id,
        type: "login-failed",
        message: "Invalid password"
      });
<<<<<<< HEAD

      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 5️⃣ Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );
=======
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "14D" });
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: user._id,
      type: "login-success",
      message: "User logged in successfully"
    });

<<<<<<< HEAD
    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {

=======
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "login-error",
      message: error.message
    });
<<<<<<< HEAD

    res.status(500).json({
      message: "Server error"
    });
  }
};

=======
    res.status(500).json({ message: "Server error" });
  }
};

export const GatAlltheUser = async(req, res) => {

  

}
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
