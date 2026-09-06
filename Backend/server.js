import dotenv from "dotenv";
dotenv.config();     // <-- MUST be the first line

import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from "./routes/productRoute.js";
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is missing. Add it to Backend/.env.");
}

console.log("Backend server starting...");

//App Config
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//api endPoints
app.use('/api/user', userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);

app.get('/', (req, res) => {
  res.send("Api calling");
});

const startServer = async () => {
  try {
    await connectDB();
    connectCloudinary();

    app.listen(port, () => {
      console.log('server started on Port :' + port);
    });
  } catch (error) {
    console.error('❌ Backend startup failed:', error.message);
    process.exitCode = 1;
  }
};

startServer();
