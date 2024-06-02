import express from "express";
import connectDB from "./database/connectDB.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
const app = express();
dotenv.config();
app.use(express.json());
connectDB();
app.use("/api/user", userRouter);
app.use("/api/user", authRouter);
// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).send({ success: false, statusCode, message });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`run on port ${PORT}`));
