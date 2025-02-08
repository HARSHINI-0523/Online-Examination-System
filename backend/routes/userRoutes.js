const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
const User = require("../models/User");

dotenv.config();

//signup
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

    res.status(201).json({ token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } 
  catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
