import express from "express";

import { RazorpayCreatePayment, RazorpayVerifyPayment, RazorpayWebhook, TotalPaymentamountCount } from "../Controllers/RazorpayPaymentController.js";
import paymentLimiter from "../Middleware/Paymentratelimitmiddlewear.js";
import { protect } from "../Middleware/Userauthmiddlewear.js";


const RazorpayPaymentRoute = express.Router()

 RazorpayPaymentRoute.post("/createPayment", paymentLimiter, protect, RazorpayCreatePayment);
 RazorpayPaymentRoute.post("/verifyPayment", protect, RazorpayVerifyPayment);
 RazorpayPaymentRoute.post("/webhook", RazorpayWebhook);
 RazorpayPaymentRoute.get("/totalRevenue-Count", TotalPaymentamountCount)

export default RazorpayPaymentRoute