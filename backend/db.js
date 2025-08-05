import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // For development, using a local MongoDB instance
    // In production, you would use process.env.MONGO_URI from .env file
    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
