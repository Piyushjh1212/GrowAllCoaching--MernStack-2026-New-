// Middleware/UserAuthMiddleware.js
import jwt from "jsonwebtoken";
import UserSignup from "../Modals/UserSignupModal.js";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { logSecurityEventHelper } from "../Helpers/SuspiouslogHelper.js"; // logging helper
import Admin from "../Modals/AdminModal.js";

// ----------------------- PROTECT -----------------------
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "protect-block",
        message: "No token provided"
      });
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = await UserSignup.findById(decoded.id).select("-password");

    if (!req.user) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        type: "protect-block",
        message: "Token valid but user not found"
      });
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "protect-block",
      message: "Token failed or expired"
    });
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// -----------------------  ADMIN PROTECT MIDDLEWEAR -----------------------
export const adminProtect = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.admin = admin;

    next();

  } catch (error) {

    console.log(error.message);

    res.status(401).json({ message: "Admin not authorized" });

  }
};

// ----------------------- LOGIN RATE LIMITER -----------------------
export const LoginrateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
    const remaining = req.rateLimit.limit - req.rateLimit.current;

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: req.user?._id || null,
      type: "rate-limit",
      message: `Too many login requests. Remaining attempts: ${remaining}`
    });

    res.status(429).json({
      message: "Too many login attempts! Try again later.",
      remainingAttempts: remaining > 0 ? remaining : 0,
      retryAfter
    });
  }
});

// ----------------------- SIGNUP RATE LIMITER -----------------------
export const SignuprateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res) => {
    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      type: "rate-limit",
      message: "Too many signup requests"
    });

    res.status(429).json({
      message: "Too many signup attempts, please try again later"
    });
  }
});

// ----------------------- SLOWDOWN -----------------------
export const speedSlowDownLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 3,            // 3 requests ke baad delay
  delayMs: () => 1000       // 1 second per extra request
  // ✅ onLimitReached option removed because it's deprecated in new versions
});

export const AdminRegisterLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes window
  max: 3, // max 3 registration attempts per IP in 5 mins
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers
  handler: async (req, res) => {
    // log the blocked attempt
    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: null,
      type: "rate-limit",
      message: "Too many admin registration attempts"
    });

    res.status(429).json({
      message: "Too many registration attempts! Try again later."
    });
  }
});