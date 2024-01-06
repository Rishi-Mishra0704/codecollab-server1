import mongoose, { Schema, Document } from "mongoose";

export interface IUserRegister extends Document {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface IUserLogin extends Document {
  email: string;
  password: string;
}

const UserRegisterSchema = new Schema<IUserRegister>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password1: { type: String, required: true },
  password2: { type: String, required: true },
});

const UserLoginSchema = new Schema<IUserLogin>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const userRegisterModel = mongoose.model<IUserRegister>(
  "UserRegister",
  UserRegisterSchema
);
export const userLoginModel = mongoose.model<IUserLogin>(
  "UserLogin",
  UserLoginSchema
);
