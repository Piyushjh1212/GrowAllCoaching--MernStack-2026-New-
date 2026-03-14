import razorpay from "../Config/RazorpayConfig.js";
import crypto from "crypto";
import Payment from "../Modals/RazorpayPaymentModal.js";
<<<<<<< HEAD
import CourseModule from "../Modals/CourseModuleModal.js";
import UserSignup from "../Modals/UserSignupModal.js";
import { sendEmail } from "../Services/EmailServices.js";

=======
import CourseModule from "../Modals/CourseModuleModal.js"; // jo bhi tumhara module model hai
import UserSignup from "../Modals/UserSignupModal.js"
import { sendEmail } from "../Services/EmailServices.js";


>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
// 💳 Create Payment
export const RazorpayCreatePayment = async (req, res) => {
  try {
    const { moduleId } = req.body;

<<<<<<< HEAD
    // module check
    const module = await CourseModule.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    // check already purchased & still valid
    const alreadyPurchased = await UserSignup.findOne({
      _id: req.user._id,
      purchasedModules: { $elemMatch: { module: moduleId, expiryDate: { $gt: new Date() } } }
    });

    if (alreadyPurchased)
      return res.status(400).json({ message: "Module already purchased" });

    // check pending payment
    const existingPending = await Payment.findOne({
      user: req.user._id,
      module: moduleId,
      status: "pending"
    });

    if (existingPending)
      return res.status(200).json({
        success: true,
        order: { id: existingPending.razorpayOrderId, amount: existingPending.amount * 100 },
        key: process.env.RAZORPAY_KEY_ID
      });

    const amount = module.Discountprice || module.Realprice;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `mod_${Date.now()}`.slice(0, 40)
=======
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
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    };

    const order = await razorpay.orders.create(options);

<<<<<<< HEAD
    // store pending payment
=======
    // 4️⃣ Save payment as pending
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
    await Payment.create({
      user: req.user._id,
      module: moduleId,
      razorpayOrderId: order.id,
      amount,
      status: "pending"
    });

<<<<<<< HEAD
    res.status(200).json({ success: true, order, key: process.env.RAZORPAY_KEY_ID });
=======
    // 5️⃣ Send order to frontend
    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID
    });

>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment creation failed" });
  }
};

<<<<<<< HEAD
// ✅ Verify Payment
=======
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
export const RazorpayVerifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, moduleId } = req.body;

<<<<<<< HEAD
    // duplicate payment check
    const existingPayment = await Payment.findOne({ razorpayPaymentId: razorpay_payment_id });
    if (existingPayment) return res.status(400).json({ message: "Payment already processed" });

    // verify payment record
    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id, user: req.user._id });
    if (!payment) return res.status(404).json({ message: "Payment record not found" });

    // signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({ message: "Invalid signature" });
    }

    // check already purchased again
    const alreadyPurchased = await UserSignup.findOne({
      _id: req.user._id,
      purchasedModules: { $elemMatch: { module: moduleId, expiryDate: { $gt: new Date() } } }
    });

    if (alreadyPurchased) {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({ message: "Module already purchased" });
    }

    const validityDays = 30;
    const validUntil = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000);

    // ✅ update payment document correctly
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "success";
    payment.expiryDate = validUntil;
    await payment.save();

    // unlock module for user
    await UserSignup.findByIdAndUpdate(req.user._id, {
      $push: { purchasedModules: { module: moduleId, expiryDate: validUntil } }
    });

    res.status(200).json({ success: true, message: "Payment verified & module unlocked" });
=======
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

>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

<<<<<<< HEAD
// ❌ Payment Failed (User Cancel)
export const RazorpayPaymentFailed = async (req, res) => {
  try {
    const { orderId } = req.body;

    const payment = await Payment.findOne({ razorpayOrderId: orderId, user: req.user._id });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = "failed";
    await payment.save();

    res.status(200).json({ success: true, message: "Payment marked as failed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔔 Razorpay Webhook
export const RazorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const expectedSignature = crypto.createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature !== expectedSignature)
      return res.status(400).json({ message: "Invalid webhook signature" });

    const event = req.body.event;
    const paymentData = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ razorpayOrderId: paymentData.order_id });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (event === "payment.captured") {
=======
export const RazorpayWebhook = async (req, res) => {
  try {

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const event = req.body.event;

    // ✅ Payment Success
    if (event === "payment.captured") {

      const paymentData = req.body.payload.payment.entity;

      const payment = await Payment.findOne({
        razorpayOrderId: paymentData.order_id
      });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
      payment.status = "success";
      payment.razorpayPaymentId = paymentData.id;
      await payment.save();

<<<<<<< HEAD
      const user = await UserSignup.findById(payment.user);
      await sendEmail({
        to: user.email,
        subject: "Payment Successful - Growall Coaching",
        html: `<h2>Payment Successful 🎉</h2><p>Your course payment has been completed successfully.</p>`
      });
    }

    if (event === "payment.failed") {
      payment.status = "failed";
      await payment.save();
    }

    res.status(200).json({ success: true });
=======
      // user fetch
      const user = await UserSignup.findById(payment.user);

      // 📧 send email
      await sendEmail({
        to: user.email,
        subject: "Payment Successful - Growall Coaching",
        html: `
        <h2>Payment Successful</h2>
        <p>Your course payment has been completed successfully.</p>
        <p>You can now access your module.</p>
        `
      });

    }

    // ❌ Payment Failed
    if (event === "payment.failed") {

      const paymentData = req.body.payload.payment.entity;

      const payment = await Payment.findOne({
        razorpayOrderId: paymentData.order_id
      });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      payment.status = "failed";
      await payment.save();

      const user = await UserSignup.findById(payment.user);

      // 📧 failed email
      await sendEmail({
        to: user.email,
        subject: "Payment Failed - Growall Coaching",
        html: `
        <h2>Payment Failed</h2>
        <p>Your payment attempt was unsuccessful.</p>
        <p>Please try again.</p>
        `
      });

    }

    res.status(200).json({ success: true });

>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Webhook error" });
  }
};

<<<<<<< HEAD
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
=======

export const TotalPaymentamountCount = async (req, res) => {
  try {
    const result = await Payment.aggregate([
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
    res.status(500).json({ success: false, message: "Server Error" });
  }

}
>>>>>>> 42eae80c144738479691a32c1b7ab090dbef131c
