import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
    windowMs: 60 * 1000,   // minute
      max: 5,              // 1 IP se max 5 requests per minute
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after a minute"
    },
    standardHeaders: true, // RateLimit info headers
    legacyHeaders: false
});