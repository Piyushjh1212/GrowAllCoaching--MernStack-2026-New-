import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Contactroutes from './Routes/ContactRoutes.js'
import CoursesRoutes from './Routes/Coursestroutes.js';
import connectDB from './Config/Connectdb.js';
import CloudinaryRoutes from './Routes/CloudinaryRoutes.js';
import UserLoginSignup from './Routes/UserSignupRoutes.js';
import RazorpayPaymentRoute from './Routes/RazorpayPaymentRoutes.js';
import CoursesCommentRoutes from './Routes/CourseCommentRoutes.js';
import helmet from "helmet";
import SecuritysuspiousRoutes from './Routes/SecuritysuspiousRoutes.js';
import { customSanitize } from './Middleware/CustomSanitizecloneMiddlewear.js';


const app = express();

app.use(customSanitize);

// middleware
app.use(cors());

app.use(helmet());

app.use(express.json());

// database connection
dotenv.config();
connectDB();


// Routes
app.use('/api/v1', Contactroutes);
app.use('/api/v1', CoursesRoutes);

// CloudinaryRoutre here 
app.use('/api/v1/cloudinary', CloudinaryRoutes);

// LoginSignup Routes
app.use('/api/v1/UserLoginSignup', UserLoginSignup) 

// Razorpay Routeshere
app.use('/api/v1/Razorpay', RazorpayPaymentRoute)

// Comment Api 
app.use('/api/v1', CoursesCommentRoutes)

// Suspiouslogs

app.use('/api/v1/', SecuritysuspiousRoutes)


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