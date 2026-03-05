import express from "express";
import { protect } from "../Middleware/authmiddlewear.js";
import { RazorpayCreatePayment, RazorpayVerifyPayment, RazorpayWebhook } from "../Controllers/RazorpayPaymentController.js";

const RazorpayPaymentRoute = express.Router()

 RazorpayPaymentRoute.post("/createPayment", protect, RazorpayCreatePayment);
 RazorpayPaymentRoute.post("/verifyPayment", protect, RazorpayVerifyPayment);
 RazorpayPaymentRoute.post("/webhook", RazorpayWebhook);


export default RazorpayPaymentRoute