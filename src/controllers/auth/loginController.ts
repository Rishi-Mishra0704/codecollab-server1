import { Request, Response } from "express";
import { userModel, IUser } from "../../models/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const loginController = async (
  req: Request,
  res: Response,
  next: (arg0: Error) => any
) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user: IUser | null = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password1
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: user.id, email: user.email },
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: {
        userId: user.id,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
