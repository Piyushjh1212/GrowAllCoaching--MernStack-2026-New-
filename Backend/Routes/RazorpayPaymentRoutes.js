import express from "express";

import { RazorpayCreatePayment, RazorpayVerifyPayment, RazorpayWebhook } from "../Controllers/RazorpayPaymentController.js";
import paymentLimiter from "../Middleware/Paymentratelimitmiddlewear.js";
import { protect } from "../Middleware/Userauthmiddlewear.js";

const RazorpayPaymentRoute = express.Router()

 RazorpayPaymentRoute.post("/createPayment", paymentLimiter,protect, RazorpayCreatePayment);
 RazorpayPaymentRoute.post("/verifyPayment", protect, RazorpayVerifyPayment);
 RazorpayPaymentRoute.post("/webhook", RazorpayWebhook);


export default RazorpayPaymentRoute