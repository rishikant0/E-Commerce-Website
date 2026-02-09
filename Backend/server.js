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

// Verify JWT_SECRET_KEY is loaded
console.log("===== ENVIRONMENT VERIFICATION =====");
console.log("🔑 JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
console.log("🔑 JWT_SECRET_KEY length:", process.env.JWT_SECRET_KEY?.length);
console.log("🔑 JWT_SECRET_KEY char codes:", [...(process.env.JWT_SECRET_KEY || '')].map(c => c.charCodeAt(0)).join(','));
console.log("✅ Backend server starting...");
console.log("===== END VERIFICATION =====");

//App Config
const app = express();
const port = process.env.PORT || 5000;

connectDB();
connectCloudinary();

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

app.listen(port, () => {
  console.log('server started on Port :' + port);
});
