import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './config/db.js';
import bootcamps from './routes/bootcamps.js';

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));