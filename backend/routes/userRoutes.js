const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
const User = require("../models/User");


dotenv.config();

// Signup
router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      if (existingUser.email === email)
        return res.status(409).json({ message: "Email already exists" });
      else return res.status(409).json({ message: "Username already exists" });
    }
    const newUser = new User({
      email,
      username,
      password,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("examToken", token, {
      httpOnly: true,
      secure: true, // Use HTTPS
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username or password" });

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.cookie("examToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", user }); // <-- Return user data
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Check session (verify cookie)
router.get("/check-session", (req, res) => {
  console.log(req.cookies);
  const token = req.cookies.examToken;
  if (!token) return res.status(401).json({ message: "Session expired" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "User is logged in", userId: decoded.id });
  } catch (error) {
    res.status(401).json({ message: "Invalid session" });
  }
});

// Logout (Clear Cookies)
router.post("/logout", (req, res) => {
  res.clearCookie("examToken");
  res.json({ message: "Logged out" });
});

// Update user details
router.put("/update", async (req, res) => {
  const { username, ...updateData } = req.body; // Destructure username and update data from request body
  try {
    const updatedUser = await User.findOneAndUpdate({username:username}, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;