import UserSignup from "../Modals/UserSignupModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logSecurityEventHelper } from "../Helpers/SuspiouslogHelper.js";

export const UserSignupController = async (req, res) => {
  try {

    // 1️⃣ Raw input (attack detection)
    const rawData = req.Body;

    const suspiciousPattern = /<script|onerror|onload|javascript:/i;

    if (Object.values(rawData).some(v => typeof v === "string" && suspiciousPattern.test(v))) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "xss-attempt",
        message: "Suspicious XSS attempt detected"
      });
    }

    // 2️⃣ Use sanitized data from middleware
    const { name, email, password, confirmPassword } = req.sanitizedBody;

    // 3️⃣ Empty fields
    if (!name || !email || !password || !confirmPassword) {

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "Empty fields"
      });

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

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "Passwords do not match"
      });

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

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "signup-failed",
        message: "User already exists"
      });

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
      password: hashedPassword
    });

    // 🔟 Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );

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
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "signup-error",
      message: error.message
    });

    res.status(500).json({
      message: error.message
    });
  }
};



export const UserLoginController = async (req, res) => {

  try {

    // 1️⃣ Raw attack detection
    const suspiciousPattern = /<script|onerror|onload|javascript:/i;

    if (Object.values(req.sanitizedBody).some(v => typeof v === "string" && suspiciousPattern.test(v))) {

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
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

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "login-failed",
        message: "Invalid email"
      });

      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 4️⃣ Compare password
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

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: user._id,
      type: "login-success",
      message: "User logged in successfully"
    });

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "login-error",
      message: error.message
    });

    res.status(500).json({
      message: "Server error"
    });
  }
};

export const GatAlltheUser = () =>{

}