import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email!" });
    }

    // 2. Create new user
    const user = await User.create({ name, email, password });

    if (user) {
      // 3. Generate token and set cookie
      generateToken(user._id, res); 

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user & get token
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email and include password field
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      // 2. Generate token and set cookie
      generateToken(user._id, res);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout user by clearing the JWT cookie
export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // expire the cookie immediately
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};