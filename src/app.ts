import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import projectRouter from "./routes/projectRouter";
import roomRouter from "./routes/roomRouter";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", userRouter);
app.use("/project", projectRouter);
app.use("/room", roomRouter);
mongoose
  .connect("mongodb://localhost:27017/codecollab")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

export default app;
