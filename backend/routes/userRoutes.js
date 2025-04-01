const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/User");
const authenticateUser = require("../middleware/authMiddleware");

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret"; // Use a default secret for development

// **Signup**
router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: existingUser.email === email ? "Email already exists" : "Username already exists" });
    }

    // **Hash password before saving**
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    // **Generate JWT Token**
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "24h" });

    res.cookie("examToken", token, {
      httpOnly: true,
      secure: false, // Change to `true` in production with HTTPS
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// **Login**
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username or password" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: "Invalid username or password" });

    // **Generate JWT Token**
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    /*res.cookie("examToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });*/
res.cookie("examToken", token, {
  httpOnly: true,
  secure: true, // Ensure it's set for HTTPS
  sameSite: "None", // REQUIRED for cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// **Check session**
router.get("/check-session", authenticateUser, (req, res) => {
  res.json({ message: "User is logged in", userId: req.user.id });
});

// **Logout**
router.post("/logout", (req, res) => {
  res.clearCookie("examToken");
  res.json({ message: "Logged out" });
});

// **Update user details**
router.put("/update", authenticateUser, async (req, res) => {
  const { username, ...updateData } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ username }, updateData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// **Change password**
router.put("/change-password", authenticateUser, async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id;

  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // **Compare old password**
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // **Hash the new password**
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
