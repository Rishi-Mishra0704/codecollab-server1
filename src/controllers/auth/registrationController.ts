import { Request, Response } from "express";
import { IUser, userModel } from "../../models/user";
import jwt from "jsonwebtoken";

export const registrationController = async (
  req: Request,
  res: Response,
  next: (arg0: Error) => any
) => {
  try {
    const { username, email, password1, password2 } = req.body;
    // Check if the passwords match
    if (password1 !== password2) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    // Create a new user without the hashed password
    const newUser: IUser = new userModel({
      username,
      email,
      password1,
      password2,
    });

    await newUser.save();
    let token;
    try {
      token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    res.status(201).json({
      success: true,
      data: { userId: newUser._id, email: newUser.email, token: token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
