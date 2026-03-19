// Controllers/RazorpayPaymentController.js
import razorpay from "../Config/RazorpayConfig.js";
import crypto from "crypto";
import Payment from "../Modals/RazorpayPaymentModal.js";
import CourseModule from "../Modals/CourseModuleModal.js";
import UserSignup from "../Modals/UserSignupModal.js";
import { sendEmail } from "../Services/EmailServices.js";
import { logSecurityEventHelper } from "../Helpers/SuspiouslogHelper.js";

// 💳 Create Payment
export const RazorpayCreatePayment = async (req, res) => {
  try {
    const { moduleId } = req.body;

    // 1️⃣ Check module exists
    const module = await CourseModule.findById(moduleId);

    if (!module) {
      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user?._id,
        type: "MODULE_NOT_FOUND",
        message: `User tried to purchase invalid module ${moduleId}`
      });

      return res.status(404).json({ message: "Module not found" });
    }

    // 2️⃣ Check if already purchased
    const alreadyPurchased = await UserSignup.findOne({
      _id: req.user._id,
      purchasedModules: {
        $elemMatch: { module: moduleId, expiryDate: { $gt: new Date() } }
      }
    });

    if (alreadyPurchased) {

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user._id,
        type: "ALREADY_PURCHASE_ATTEMPT",
        message: `User attempted to repurchase module ${moduleId}`
      });

      return res.status(400).json({ message: "Module already purchased" });
    }

    // 3️⃣ Check pending payment
    const existingPending = await Payment.findOne({
      user: req.user._id,
      module: moduleId,
      status: "pending"
    });

    if (existingPending) {

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user._id,
        type: "MULTIPLE_PAYMENT_ATTEMPT",
        message: `Multiple payment attempt for module ${moduleId}`
      });

      return res.status(200).json({
        success: true,
        order: {
          id: existingPending.razorpayOrderId,
          amount: existingPending.amount * 100
        },
        key: process.env.RAZORPAY_KEY_ID
      });
    }

    // 4️⃣ Create Razorpay order
    const amount = module.Discountprice || module.Realprice;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // 5️⃣ Save payment
    await Payment.create({
      user: req.user._id,
      module: moduleId,
      razorpayOrderId: order.id,
      amount,
      status: "pending"
    });

    // 📊 Log payment order creation
    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: req.user._id,
      type: "PAYMENT_ORDER_CREATED",
      message: `Order created ${order.id} for module ${moduleId}`
    });

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: req.user?._id,
      type: "PAYMENT_CREATE_ERROR",
      message: error.message
    });

    console.error(error);
    res.status(500).json({ message: "Payment creation failed" });
  }
};


// ✅ Verify Payment
export const RazorpayVerifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      moduleId
    } = req.body;

    // 1️⃣ Signature verify
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user?._id,
        type: "SIGNATURE_TAMPERING",
        message: `Invalid Razorpay signature detected`
      });

      return res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }

    // 2️⃣ Update payment success
    const validityDays = 30;

    const validUntil = new Date(
      Date.now() + validityDays * 24 * 60 * 60 * 1000
    );

    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "success",
        expiryDate: validUntil
      },
      { returnDocument: "after" }
    );

    if (!payment) {

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user?._id,
        type: "PAYMENT_NOT_FOUND",
        message: `Order ${razorpay_order_id} not found`
      });

      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    // 3️⃣ Add module to user
    await UserSignup.findByIdAndUpdate(req.user._id, {
      $push: {
        purchasedModules: {
          module: moduleId,
          expiryDate: validUntil
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Payment verified & module purchased"
    });

  } catch (error) {

    await logSecurityEventHelper({
      endpoint: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: req.user?._id,
      type: "PAYMENT_VERIFY_ERROR",
      message: error.message
    });

    console.error(error);
    res.status(500).json({
      message: "Payment verification failed"
    });
  }
};


// ❌ Payment Failed
export const RazorpayPaymentFailed = async (req, res) => {
  try {

    const { orderId } = req.body;

    const payment = await Payment.findOne({
      razorpayOrderId: orderId,
      user: req.user._id
    });

    if (!payment) {

      await logSecurityEventHelper({
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userId: req.user._id,
        type: "FAILED_PAYMENT_NOT_FOUND",
        message: `User tried to mark unknown payment failed`
      });

      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = "failed";

    await payment.save();

    res.status(200).json({
      success: true,
      message: "Payment marked as failed"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};



// 🔔 Razorpay Webhook
export const RazorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex");
    if (signature !== expectedSignature) return res.status(400).json({ message: "Invalid webhook signature" });

    const event = req.body.event;
    const paymentData = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ razorpayOrderId: paymentData.order_id });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    // Payment success
    if (event === "payment.captured") {
      payment.status = "success";
      payment.razorpayPaymentId = paymentData.id;
      await payment.save();

      const user = await UserSignup.findById(payment.user);
      await sendEmail({
        to: user.email,
        subject: "Payment Successful - Growall Coaching",
        html: `<h2>Payment Successful 🎉</h2><p>Your course payment has been completed successfully.</p>`
      });
    }

    // Payment failed
    if (event === "payment.failed") {
      payment.status = "failed";
      await payment.save();

      const user = await UserSignup.findById(payment.user);
      await sendEmail({
        to: user.email,
        subject: "Payment Failed - Growall Coaching",
        html: `<h2>Payment Failed ❌</h2><p>Your payment attempt was unsuccessful. Please try again.</p>`
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Webhook error" });
  }
};

// 📊 Total Revenue
export const TotalPaymentamountCount = async (req, res) => {
  try {
    const result = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
    ]);
    const totalAmount = result[0]?.totalAmount || 0;
    res.status(200).json({ success: true, totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// 📄 Get all payment records
export const GetPaymentamoutRecord = async (req, res) => {
  try {
    const payments = await Payment.find()
      .sort({ createdAt: -1 }); // latest first

    if (!payments || payments.length === 0) {
      return res.status(200).json({ success: true, payments: [] });
    }

    // Map to safe JSON without populate
    const safePayments = payments.map(p => ({
      _id: p._id,
      user: p.user || null,       // ObjectId
      module: p.module || null,   // ObjectId
      amount: p.amount || 0,
      status: p.status || "pending",
      createdAt: p.createdAt,
      razorpayOrderId: p.razorpayOrderId || "",
      razorpayPaymentId: p.razorpayPaymentId || "",
      expiryDate: p.expiryDate || null
    }));

    res.status(200).json({ success: true, payments: safePayments });
  } catch (error) {
    console.error("GetPaymentamoutRecord Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch payment records" });
  }
};