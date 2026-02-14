import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './ConnectDb/Connectdb.js';
import Contactroutes from './Routes/ContactRoutes.js'
import CoursesRoutes from './Routes/Coursestroutes.js';



const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection
dotenv.config();
connectDB();


// Routes
app.use('/api/v1', Contactroutes);
app.use('/api/v1', CoursesRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

