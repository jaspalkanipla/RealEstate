import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoUrl);
    console.log("connencted to db");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB