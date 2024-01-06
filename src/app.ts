import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", userRouter);

mongoose
  .connect("mongodb://localhost:27017/codecollab")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

export default app;
