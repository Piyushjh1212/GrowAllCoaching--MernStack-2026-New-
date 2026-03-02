import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Contactroutes from './Routes/ContactRoutes.js'
import CoursesRoutes from './Routes/Coursestroutes.js';
import connectDB from './Config/Connectdb.js';
import CloudinaryRoutes from './Routes/CloudinaryRoutes.js';
import { contactLimiter } from './Middleware/Contactratelimitermiddlewear.js';




const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection
dotenv.config();
connectDB();


// Routes
app.use('/api/v1', Contactroutes , contactLimiter);
app.use('/api/v1', CoursesRoutes);

// CloudinaryRoutre here 

app.use('/api/v1/cloudinary', CloudinaryRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

