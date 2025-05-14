import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection && mongoose.connection.readyState !== 0) {
      console.log("Database connection is already established");
    } else {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log("Database connection is now established");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
