import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// sign up
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, phone, country, state, city, role } = req.body;

    // basic validation
    if (!name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, and password are required",
      });
    }

    // check existing by email OR phone
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "User with this phone already exists",
      });
    }

    // hash password
    const hashPass = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashPass,
      phone,
      country,
      state,
      city,
      role,
    });

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      country: user.country,
      state: user.state,
      city: user.city,
    };

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Signup error:", error); 
    if (error.code === 11000 && error.keyValue.phone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// login

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // find user either by email or phone
    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }]
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password
    const passMatch = await bcrypt.compare(password, existingUser.password);
    if (!passMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      role: existingUser.role,
    };

    res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// logout

// getuser

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userData = await User.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
