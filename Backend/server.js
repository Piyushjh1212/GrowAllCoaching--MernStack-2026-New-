import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import { customSanitize } from './Middleware/CustomSanitizecloneMiddlewear.js';
import connectDB from './Config/Connectdb.js';
import Contactroutes from './Routes/ContactRoutes.js'
import CoursesRoutes from './Routes/Coursestroutes.js';
import CloudinaryRoutes from './Routes/CloudinaryRoutes.js';
import UserLoginSignup from './Routes/UserSignupRoutes.js';
import RazorpayPaymentRoute from './Routes/RazorpayPaymentRoutes.js';
import CoursesCommentRoutes from './Routes/CourseCommentRoutes.js';
import SecuritysuspiousRoutes from './Routes/SecuritysuspiousRoutes.js';
import AWSRoutes from './Routes/AWSRoutes.js';
import PresignedUrlRoutes from './Routes/GetpresignedurlRoutes.js';

const app = express();

dotenv.config();
connectDB();

app.use(helmet());

app.use(cors());

// body parser
app.use(express.json());

// custom XSS sanitize
app.use(customSanitize);

// Routes
app.use('/api/v1', Contactroutes);
app.use('/api/v1', CoursesRoutes);
// CloudinaryRoutre here 
app.use('/api/v1/cloudinary', CloudinaryRoutes);
// LoginSignup Routes
app.use('/api/v1/UserLoginSignup', UserLoginSignup);
// Razorpay Routeshere
app.use('/api/v1/Razorpay', RazorpayPaymentRoute);
// Comment Api 
app.use('/api/v1', CoursesCommentRoutes);
// Suspiouslogs
app.use('/api/v1', SecuritysuspiousRoutes);

app.use('/api/v1/AWS', AWSRoutes);
// PreSignedUrls Routes 
app.use('/api/presigned', PresignedUrlRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



// Razorpay Webhook
// app.use(
//   "/api/v1/Razorpay/webhook",
//   express.raw({ type: "application/json" })
// );