import express from "express";
import registrationController from "../controllers/auth/registrationController";

const userRouter = express.Router();

userRouter.post("/register", registrationController);

export default userRouter