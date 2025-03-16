const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  duration: String,
  totalQuestions: Number,
  totalMarks: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to teacher
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
