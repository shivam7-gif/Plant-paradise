import { User } from "../db/dbconnection";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const signupController = async (req: Request, res: Response) => {
  try {
    console.log("HEADERS:", req.headers["content-type"]);
    console.log("BODY:", req.body);

    const { name, email, password } = req.body; // destructure correctly

    // ✅ validate the correct variables
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,        // ✅ use name here
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { password: _, ...safeUser } = user.get();

    return res.status(200).json(safeUser);
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
