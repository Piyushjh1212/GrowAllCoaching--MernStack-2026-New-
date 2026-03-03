import express from "express";
import { protect } from "../Middleware/authmiddlewear.js";
import { RazorpayCreatePayment, RazorpayVerifyPayment } from "../Controllers/RazorpayPaymentController.js";

const RazorpayPaymentRoute = express.Router()

 RazorpayPaymentRoute.post("/createPayment", protect, RazorpayCreatePayment);
 RazorpayPaymentRoute.post("/verifyPayment", protect, RazorpayVerifyPayment);


export default RazorpayPaymentRoute