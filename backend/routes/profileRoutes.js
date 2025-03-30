const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Classroom = require("../models/Classroom");

// Get user profile data and pie chart data
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;  // Assumes user authentication middleware is setting `req.user.id`
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Categorize the test scores for the pie chart
    const categories = { "<40%": 0, "40-70%": 0, ">70%": 0 };
    user.recentTests.forEach((test) => {
      if (test.score < 40) categories["<40%"]++;
      else if (test.score < 70) categories["40-70%"]++;
      else categories[">70%"]++;
    });

    // Prepare pie chart data
    const pieData = [
      { name: "<40%", value: categories["<40%"], color: "#ff4d4d" },
      { name: "40-70%", value: categories["40-70%"], color: "#ffc107" },
      { name: ">70%", value: categories[">70%"], color: "#28a745" },
    ];

    // Return both user profile and pie chart data
    res.json({ user, pieData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get classrooms for the user
router.get("/classrooms", async (req, res) => {
  try {
    const userId = req.user.id;
    const classrooms = await Classroom.find({ members: userId });
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Store user profile data
router.post("/", async (req, res) => {
  try {
    const { username, email, role, workPlace, photo } = req.body;
    const newUser = new User({ username, email, role, workPlace, photo });
    await newUser.save();
    res.status(201).json({ message: "User profile saved successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error saving user profile", error });
  }
});

module.exports = router;
