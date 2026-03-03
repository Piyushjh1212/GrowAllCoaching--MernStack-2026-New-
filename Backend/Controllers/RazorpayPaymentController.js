import razorpay from "../Config/RazorpayConfig.js";
import crypto from "crypto";
import Payment from "../Modals/RazorpayPaymentModal.js";
import CourseModule from "../Modals/CourseModuleModal.js"; // jo bhi tumhara module model hai
import UserSignup from "../Modals/UserSignupModal.js"


// 💳 Create Payment
export const RazorpayCreatePayment = async (req, res) => {
  try {
    const { moduleId } = req.body;

    // 1️⃣ Check module exists
    const module = await CourseModule.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // 2️⃣ Amount DB se lo (never trust frontend price)
    const amount = module.Discountprice || module.Realprice;

    // 3️⃣ Razorpay order create
    const options = {
      amount: amount * 100, // paise me convert
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // 4️⃣ Save payment as pending
    await Payment.create({
      user: req.user._id,
      module: moduleId,
      razorpayOrderId: order.id,
      amount,
      status: "pending"
    });

    // 5️⃣ Send order to frontend
    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment creation failed" });
  }
};

export const RazorpayVerifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, moduleId } = req.body;

    // 1️⃣ Create expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // 2️⃣ Compare signatures
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // 3️⃣ Update Payment as success + validUntil
    const validityDays = 30; // 30 din
    const validUntil = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000);

    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "success",
        validUntil,
      },
      { returnDocument: "after" }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    // 4️⃣ Add module + validity to User purchasedModules
    await UserSignup.findByIdAndUpdate(req.user._id, {
      $push: {
        purchasedModules: {
          module: moduleId,
          expiryDate: validUntil,
        },
      },
    });

    // 5️⃣ Response
    return res.status(200).json({ success: true, message: "Payment verified & module purchased" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};