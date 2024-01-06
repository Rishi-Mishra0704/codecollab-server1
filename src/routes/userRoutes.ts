import express from "express";
import {registrationController, loginController} from "../controllers/auth";

const userRouter = express.Router();

userRouter.post("/register", registrationController);
userRouter.post("/login", loginController);

export default userRouter