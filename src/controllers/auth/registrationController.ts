import { Request, Response } from "express";
import { IUser, userModel } from "../../models/user";

const registrationController = async (req: Request, res: Response) => {
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
      res.status(201).json({ message: "User registered successfully", newUser });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default registrationController