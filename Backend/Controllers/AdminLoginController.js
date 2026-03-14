import Admin from "../Modals/AdminModal.js";
import SecuritySuspiousLog from "../Modals/SecuritysuspiousModals.js";
import jwt from "jsonwebtoken";
import validator from "validator";

// ---------------- Admin Registration ----------------
export const AdminRegisterController = async (req, res) => {
  const { email, password } = req.sanitizedBody || {};

  try {
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      await SecuritySuspiousLog.create({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: null,
        type: "register",
        message: "Admin registration failed: already exists"
      });
      return res.status(400).json({ error: "Admin already exists" });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    await SecuritySuspiousLog.create({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: null,
      type: "register",
      message: "Admin registration successful"
    });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// ---------------- Admin Login ----------------
export const AdminLoginController = async (req, res) => {
  const { email, password } = req.sanitizedBody;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {

      await SecuritySuspiousLog.create({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "unauthorized",
        message: "Admin email not found"
      });

      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {

      await SecuritySuspiousLog.create({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: admin._id,
        type: "unauthorized",
        message: "Wrong password attempt"
      });

      return res.status(400).json({ error: "Invalid email or password" });
    }

    // JWT token
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // success log
    await SecuritySuspiousLog.create({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: admin._id,
      type: "login-success",
      message: "Admin logged in successfully"
    });

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: { id: admin._id, email: admin.email }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const AdminDashboardController = async (req, res) => {
  try {

    res.status(200).json({
      message: "Welcome Admin",
      admin: req.admin
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error"
    });
  }
};