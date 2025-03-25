const express = require("express");
const Exam = require("../models/Exam");
const authMiddleware = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Create a new exam
router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { education, classLevel, subject, testPaperName, numQuestions, timeAllowed, generalInstructions, examType, questions } = req.body;

    let examLink = "";
    if (examType === "online-test") {
      examLink = `http://localhost:5173/dashboard/exam/${uuidv4()}`;
    }

    const newExam = new Exam({
      createdBy: req.user.id,
      education,
      classLevel,
      subject,
      testPaperName,
      numQuestions,
      timeAllowed,
      generalInstructions,
      examType,
      examLink,
      questions,
    });

    await newExam.save();
    res.status(201).json({ message: "Exam created successfully!", exam: newExam });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all exams created by the logged-in teacher
router.get("/teacher-get-exams", authMiddleware, async (req, res) => {
  try {
    console.log("Requested User : ",!req.user)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const exams = await Exam.find({ createdBy: req.user.id });
    console.log("Exams created: ",exams);
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/get-exam/:examId", async (req, res) => {
  try {
    console.log("ExamId: ",req.params.examId);
    const exam = await Exam.findOne({ examLink: `http://localhost:5173/dashboard/exam/${req.params.examId }`});
    console.log("Exam: ",exam);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam" });
  }
});

module.exports = router;
