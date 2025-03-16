const express = require("express");
const Exam = require("../models/Exam");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all exams created by the logged-in teacher
router.get("/teacher-get-exams", authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const exams = await Exam.find({ createdBy: req.user.id });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



module.exports = router;
