// Routes/RazorpayPaymentRoute.js
import express from "express";
import {
  RazorpayCreatePayment,
  RazorpayVerifyPayment,
  RazorpayWebhook,
  TotalPaymentamountCount,
  RazorpayPaymentFailed,
  GetPaymentamoutRecord
} from "../Controllers/RazorpayPaymentController.js";

import paymentLimiter from "../Middleware/Paymentratelimitmiddlewear.js";
import { adminProtect, protect } from "../Middleware/Userauthmiddlewear.js";

const RazorpayPaymentRoute = express.Router();

// ✅ Create Payment
RazorpayPaymentRoute.post("/createPayment", paymentLimiter, protect, RazorpayCreatePayment);

// ✅ Verify Payment
RazorpayPaymentRoute.post("/verifyPayment", protect, RazorpayVerifyPayment);

// ✅ Payment Failed (optional route if you want to track failures)
RazorpayPaymentRoute.post("/paymentFailed", protect, RazorpayPaymentFailed);

// ✅ Webhook from Razorpay (no auth, Razorpay sends request)
RazorpayPaymentRoute.post("/webhook", RazorpayWebhook);

// ✅ Total Revenue / Payment Count
RazorpayPaymentRoute.get("/totalrevenueCount",adminProtect,  TotalPaymentamountCount);

// Get Total Payment List 
RazorpayPaymentRoute.get("/GetPaymentList", GetPaymentamoutRecord);

export default RazorpayPaymentRoute;