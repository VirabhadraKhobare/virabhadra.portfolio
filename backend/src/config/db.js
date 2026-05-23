import mongoose from "mongoose";
import "./loadEnv.js";

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  const mongoUri =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/virabhadra_portfolio";

  try {
    await mongoose.connect(mongoUri, {
      autoIndex: process.env.NODE_ENV !== "production",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};
