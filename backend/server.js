// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const events = require("events");
events.EventEmitter.defaultMaxListeners = 20;

dotenv.config();

const app = express();

// ✅ Health check route to verify backend is running
app.get("/", (req, res) => {
  res.send("Server is Live! Backend is working.");
});

// ✅ Apply CORS settings before defining routes
app.use(cors({
  origin: "https://online-examination-system-zeta.vercel.app",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));


app.use(express.json());
app.use(cookieParser());

// ✅ Import Routes
const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const classroomRoutes = require("./routes/classroomRoutes");

// ✅ Define API Routes
app.use("/api/user", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/classrooms", classroomRoutes);

// ✅ Serve Frontend in Production (Place this **after** defining API routes)


// ✅ Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
