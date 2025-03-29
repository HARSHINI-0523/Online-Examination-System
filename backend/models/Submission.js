const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  responses: { type: Object, required: true },
  score: { type: Number, required: true },
  submissionTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
