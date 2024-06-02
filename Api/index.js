import express from "express";
import connectDB from "./connectDB.js";
import dotenv from "dotenv";
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
const app = express();
dotenv.config();
app.use(express.json());
connectDB()
app.use("/api/user",userRouter)
app.use("/api/user",authRouter)
const PORT=process.env.PORT || 4000
app.listen(PORT, () => console.log(`run on port ${PORT}`));
