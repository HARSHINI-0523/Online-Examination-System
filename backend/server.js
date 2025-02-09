//import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser=require('cookie-parser');

const app = express(); //express application object
dotenv.config(); //loads environment variables from a .env file into process.env

//import routes
const userRoutes = require("./routes/userRoutes");

//Middlewares
app.use(cors({
  origin: "http://localhost:5173",// Frontend URL
  credentials: true, // Allow sending cookies
}));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/user", userRoutes);

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
