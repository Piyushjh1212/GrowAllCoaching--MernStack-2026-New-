import express from "express";

<<<<<<< HEAD
import {
  RazorpayCreatePayment,
  RazorpayVerifyPayment,
  RazorpayWebhook,
  TotalPaymentamountCount,
  RazorpayPaymentFailed
} from "../Controllers/RazorpayPaymentController.js";

import paymentLimiter from "../Middleware/Paymentratelimitmiddlewear.js";
import { protect } from "../Middleware/Userauthmiddlewear.js";

const RazorpayPaymentRoute = express.Router();

RazorpayPaymentRoute.post("/createPayment", paymentLimiter, protect, RazorpayCreatePayment);

RazorpayPaymentRoute.post("/verifyPayment", protect, RazorpayVerifyPayment);

RazorpayPaymentRoute.post("/paymentFailed", protect, RazorpayPaymentFailed);

RazorpayPaymentRoute.post("/webhook", RazorpayWebhook);

RazorpayPaymentRoute.get("/totalRevenue-Count", protect, TotalPaymentamountCount);

export default RazorpayPaymentRoute;
=======
import { RazorpayCreatePayment, RazorpayVerifyPayment, RazorpayWebhook, TotalPaymentamountCount } from "../Controllers/RazorpayPaymentController.js";
import paymentLimiter from "../Middleware/Paymentratelimitmiddlewear.js";
import { protect } from "../Middleware/Userauthmiddlewear.js";


const RazorpayPaymentRoute = express.Router()

 RazorpayPaymentRoute.post("/createPayment", paymentLimiter, protect, RazorpayCreatePayment);
 RazorpayPaymentRoute.post("/verifyPayment", protect, RazorpayVerifyPayment);
 RazorpayPaymentRoute.post("/webhook", RazorpayWebhook);
 RazorpayPaymentRoute.get("/totalRevenue-Count", TotalPaymentamountCount)

export default RazorpayPaymentRoute
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
