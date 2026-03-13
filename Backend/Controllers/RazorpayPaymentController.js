import razorpay from "../Config/RazorpayConfig.js";
import crypto from "crypto";
import Payment from "../Modals/RazorpayPaymentModal.js";
import CourseModule from "../Modals/CourseModuleModal.js";
import UserSignup from "../Modals/UserSignupModal.js";
import { sendEmail } from "../Services/EmailServices.js";


// 💳 Create Payment
export const RazorpayCreatePayment = async (req, res) => {
  try {

    const { moduleId } = req.body;

    // 1️⃣ module exists
    const module = await CourseModule.findById(moduleId);

    if (!module) {
      return res.status(404).json({
        message: "Module not found"
      });
    }

    // 2️⃣ check already purchased
    const alreadyPurchased = await UserSignup.findOne({
      _id: req.user._id,
      "purchasedModules.module": moduleId
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        message: "Module already purchased"
      });
    }

    // 3️⃣ price from DB
    const amount = module.Discountprice || module.Realprice;

    // 4️⃣ create razorpay order
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // 5️⃣ store pending payment
    await Payment.create({
      user: req.user._id,
      module: moduleId,
      razorpayOrderId: order.id,
      amount,
      status: "pending"
    });

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Payment creation failed"
    });

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

    // 1️⃣ duplicate payment check
    const existingPayment = await Payment.findOne({
      razorpayPaymentId: razorpay_payment_id
    });

    if (existingPayment) {
      return res.status(400).json({
        message: "Payment already processed"
      });
    }

    // 2️⃣ verify order belongs to user
    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
      user: req.user._id
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment record not found"
      });
    }

    // 3️⃣ signature verify
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({
        message: "Invalid signature"
      });

    }

    // 4️⃣ module duplicate check
    const alreadyPurchased = await UserSignup.findOne({
      _id: req.user._id,
      "purchasedModules.module": moduleId
    });

    if (alreadyPurchased) {

      return res.status(400).json({
        message: "Module already purchased"
      });

    }

    // 5️⃣ validity
    const validityDays = 30;

    const validUntil = new Date(
      Date.now() + validityDays * 24 * 60 * 60 * 1000
    );

    // 6️⃣ update payment
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "success";
    payment.validUntil = validUntil;

    await payment.save();

    // 7️⃣ update user purchased modules
    await UserSignup.findByIdAndUpdate(req.user._id, {

      $push: {
        purchasedModules: {
          module: moduleId,
          expiryDate: validUntil
        }
      }

    });

    return res.status(200).json({
      success: true,
      message: "Payment verified & module unlocked"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Payment verification failed"
    });

  }

};



// 🔔 Razorpay Webhook
export const RazorpayWebhook = async (req, res) => {

  try {

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    if (signature !== expectedSignature) {

      return res.status(400).json({
        message: "Invalid webhook signature"
      });

    }

    const body = JSON.parse(req.body.toString());

    const event = body.event;

    if (event === "payment.captured") {

      const paymentData = body.payload.payment.entity;

      const payment = await Payment.findOne({
        razorpayOrderId: paymentData.order_id
      });

      if (!payment) return res.status(404).json({ message: "Payment not found" });

      payment.status = "success";
      payment.razorpayPaymentId = paymentData.id;

      await payment.save();

      const user = await UserSignup.findById(payment.user);

      await sendEmail({
        to: user.email,
        subject: "Payment Successful - Growall Coaching",
        html: `
        <h2>Payment Successful</h2>
        <p>Your course payment has been completed successfully.</p>
        `
      });

    }

    if (event === "payment.failed") {

      const paymentData = body.payload.payment.entity;

      const payment = await Payment.findOne({
        razorpayOrderId: paymentData.order_id
      });

      if (!payment) return res.status(404).json({ message: "Payment not found" });

      payment.status = "failed";

      await payment.save();

    }

    res.status(200).json({ success: true });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Webhook error"
    });

  }

};



// 📊 Total Revenue
export const TotalPaymentamountCount = async (req, res) => {

  try {

    const result = await Payment.aggregate([
      {
        $match: { status: "success" }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const totalAmount = result[0]?.totalAmount || 0;

    res.status(200).json({
      success: true,
      totalAmount
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};