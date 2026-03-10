import rateLimit from "express-rate-limit";

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 requests
  message: "Too many payment requests. Please try again later."
});

export default paymentLimiter;