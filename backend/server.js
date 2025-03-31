import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import events from 'events';
events.EventEmitter.defaultMaxListeners = 20;

dotenv.config();

// Import Routes
import userRoutes from './routes/userRoutes.js';
import examRoutes from './routes/examRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import classroomRoutes from './routes/classroomRoutes.js';

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow sending cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/classrooms', classroomRoutes);

const __dirname = path.resolve();

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
