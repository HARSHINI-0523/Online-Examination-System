const UnverifiedTeacher = require("../models/unverifiedTeacher");
const User = require("../models/User");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

router.post("/verify-teacher", async (req, res) => { 
  try {
    const {
      email,
      username,
      password,
      role,
      workPlace,
      purpose,
      phone,
      address,
      photo,
    } = req.body;

    console.log(req.body);

    // Check if the user already exists in users or unverified teachers collection
    const existingUser = await User.findOne({ email });
    const existingUnverifiedUser = await UnverifiedTeacher.findOne({ email });

    if (existingUnverifiedUser) {
      return res
        .status(400)
        .json({ message: "Teacher verification request already submitted." });
    }

    if (existingUser) {
      console.log("Existing user role:", existingUser.role);

      // If the user is already a teacher, prevent duplicate entries
      if (existingUser.role === "teacher") {
        return res
          .status(400)
          .json({ message: "Teacher already exists in the user database" });
      }

      // If the user is a student, remove them from the users collection
      if (existingUser.role === "student") {
        await User.findOneAndDelete({ username: existingUser.username });
      }
    }

    // Move the user to UnverifiedTeacher collection
    const newTeacher = new UnverifiedTeacher({
      email,
      username,
      password,
      role: "teacher",  // Ensure role is explicitly set to teacher
      workPlace,
      purpose,
      phone,
      address,
      photo,
      status: "Pending",
    });

    console.log("New Teacher Data:", newTeacher);
    await newTeacher.save();

    res.status(201).json({ message: "Teacher added for verification" });

  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Teacher verification request already submitted." });
    }
    console.error("Error adding teacher:", error);
    res
      .status(500)
      .json({ message: "Error adding teacher", error: error.message });
  }
});


// Get all pending teachers
router.get("/get-Pending-Teachers", async (req, res) => {
  try {
    const { workPlace } = req.query;
    if (!workPlace) {
      return res.status(400).json({ message: "workPlace is required" });
    }
    const pendingTeachers = await UnverifiedTeacher.find({ workPlace });
    console.log("Pending Teachers: ",pendingTeachers)
    res.json(pendingTeachers);

  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
});

// Approve a teacher
router.post("/approve-Teacher", async (req, res) => {
  try {
    const { teacherId } = req.body; // Get teacherId from req.body

    console.log("Approve teacherId: ",teacherId);
    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    // Find the teacher in the unverified database
    const teacher = await UnverifiedTeacher.findById(teacherId);
    console.log("Approved Teacher: ",teacher)
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Move teacher to users database
    const newUser = new User({
      username: teacher.username,
      email: teacher.email,
      password: teacher.password,
      role: teacher.role,
      workPlace: teacher.workPlace,
      purpose: teacher.purpose,
      phone: teacher.phone,
      address: teacher.address,
      photo: teacher.photo,
    });

    await newUser.save();

    // Delete from unverified database
    await UnverifiedTeacher.findByIdAndDelete(teacherId);

    res.json({ message: "Teacher approved and added to user database" });
  } catch (error) {
    res.status(500).json({ message: "Error approving teacher", error });
  }
});

// Reject a teacher (delete from unverified database)
router.post("/reject-Teacher", async (req, res) => {
  try {
    const { teacherId } = req.body; // Get teacherId from req.body

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    await UnverifiedTeacher.findByIdAndDelete(teacherId);
    res.json({ message: "Teacher verification request rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting teacher", error });
  }
});


router.get("/is-unverified",async(req,res)=>{
  try{
    const {username}=req.query;
    console.log(username)
    if(!username){
      return res.status(400).json({message:"Username is required"});
    }
    const isUnverified=await UnverifiedTeacher.findOne({username});
    res.json({isUnverified});
  }catch(error){
    res.status(500).json({message:"Error checking unverified status",error});
  }
})


module.exports = router;
