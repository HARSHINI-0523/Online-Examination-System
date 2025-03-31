const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const events = require("events");
events.EventEmitter.defaultMaxListeners = 20;

const app = express();

// ✅ Add this route at the top to confirm the server is working
app.get("/", (req, res) => {
  res.send("Server is Live! Backend is working.");
});

// ✅ Fix CORS settings to allow your frontend to connect
app.use(cors({
  origin:"https://online-examination-system-zeta.vercel.app/",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const classroomRoutes = require("./routes/classroomRoutes");

// Use Routes
app.use("/api/user", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/classrooms", classroomRoutes);

// ✅ Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

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
