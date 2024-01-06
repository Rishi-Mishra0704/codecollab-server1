import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
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


// Hash the password1 field before saving to the database
UserRegisterSchema.pre<IUserRegister>("save", async function (next) {
  const user = this;
  if (!user.isModified("password1")) return next();

  const saltRounds = 10;
  const hashedPassword1 = await bcrypt.hash(user.password1, saltRounds);
  user.password1 = hashedPassword1;
  next();
});
export const userRegisterModel = mongoose.model<IUserRegister>(
  "UserRegister",
  UserRegisterSchema
);
export const userLoginModel = mongoose.model<IUserLogin>(
  "UserLogin",
  UserLoginSchema
);
