import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import articleRouter from "./routes/articleRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";


const app = express();
dotenv.config();

connectDB(); 

app.use(express.json());
app.use(cors()); 


const PORT = process.env.PORT || 5000;



// Basic Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", articleRouter);
app.use("/api/auth", authRouter);
app.use("/api", userRouter);


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
