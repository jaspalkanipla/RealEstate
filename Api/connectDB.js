import mongoose from "mongoose";
 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    // await mongoose.connect("mongodb://localhost:27017/realestate");
    console.log("connencted to db");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB