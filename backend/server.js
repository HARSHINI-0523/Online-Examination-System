//import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser=require('cookie-parser');

const events = require("events");
events.EventEmitter.defaultMaxListeners = 20;


const app = express(); //express application object
dotenv.config(); //loads environment variables from a .env file into process.env

//import routes
const userRoutes = require("./routes/userRoutes");
const examRoutes=require ("./routes/examRoutes");
const teacherRoutes=require("./routes/teacherRoutes");
const classroomRoutes=require("./routes/classroomRoutes");
const profileRoutes = require("./routes/profileRoutes");

//Middlewares
app.use(cors({
  origin: "http://localhost:5173",// Frontend URL
  credentials: true, // Allow sending cookies
}));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/user", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/profile", profileRoutes); // Use classroom routes
//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
