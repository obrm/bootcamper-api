import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import connectDB from './config/db.js';

import errorHandler from './middleware/errorHandler.js';

import bootcamps from './routes/bootcampsRoutes.js';
import courses from './routes/courseRoutes.js';
import auth from './routes/authRoutes.js';
import user from './routes/userRoutes.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// File uploading middleware
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Bootcamp API'
  });
});

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});