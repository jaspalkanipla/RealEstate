import express from "express";
import connectDB from "./connectDB.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json());
connectDB()

app.get("/", (req, res) => {
  res.send("sagar");
});
app.listen(3000, () => console.log("run on port 3000"));
