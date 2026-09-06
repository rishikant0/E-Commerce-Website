import mongoose from "mongoose";

const connectDB = async () => {
  const connectionString = process.env.MONGODB_URL?.trim();

  if (!connectionString) {
    throw new Error("MONGODB_URL is missing. Add a valid MongoDB Atlas connection string to Backend/.env.");
  }

  if (!connectionString.startsWith("mongodb://") && !connectionString.startsWith("mongodb+srv://")) {
    throw new Error("MONGODB_URL must start with mongodb:// or mongodb+srv://.");
  }

  mongoose.connection.once("connected", () => {
    console.log("Database connected");
  });

  await mongoose.connect(connectionString, {
    dbName: process.env.MONGODB_DB_NAME || "e-commerce",
    serverSelectionTimeoutMS: 10_000,
  });
};

export default connectDB;
