import jwt from "jsonwebtoken";
import UserSignup from "../Modals/UserSignupModal.js"
import rateLimit from "express-rate-limit";
import slowdown from 'express-slow-down'


export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserSignup.findById(decoded.id).select("-password");

    // ✅ extra safety
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();

  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};


export const LoginrateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests per windowMs
  standardHeaders: true, // Send rate limit info in headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  handler: (req, res) => {
    const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
    const remaining = req.rateLimit.limit - req.rateLimit.current;

    res.status(429).json({
      message: "Too many login attempts! Try again later.",
      remainingAttempts: remaining > 0 ? remaining : 0, // remaining attempts
      retryAfter: retryAfter
    });
  }
});

export const SignuprateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // max 10 signups per hour from same IP
  message: {
    message: "Too many signup attempts, please try again later"
  },
});


export const speedSlowDownLimiter = slowdown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 3,            // 3 requests ke baad delay
  delayMs: () => 1000             // 1 sec per extra request
})
