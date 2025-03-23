const mongoose = require("mongoose");

const UnverifiedTeacherSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: String,
    password: String,
    role: String,
    workPlace: String,
    purpose: String,
    phone: String,
    address: String,
    photo: String,
    status: { type: String, default: "Pending" },
  });
    

module.exports = mongoose.model("unverifiedTeacher", UnverifiedTeacherSchema);
