const mongoose = require("mongoose");

const detailedAnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  score: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  responses: { type: Object, required: true }, // Store question-wise responses
  submissionTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DetailedAnalysis", detailedAnalysisSchema);
