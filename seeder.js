import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

import Bootcamp from './models/Bootcamp.js';
import Course from './models/Course.js';
import User from './models/User.js';
import Review from './models/Review.js';

dotenv.config({ path: './config/config.env' });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bootcamps = JSON.parse(
  fs.readFileSync(new URL('./_data/bootcamps.json', import.meta.url), 'utf-8')
);

const courses = JSON.parse(
  fs.readFileSync(new URL('./_data/courses.json', import.meta.url), 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(new URL('./_data/users.json', import.meta.url), 'utf-8')
);

const reviews = JSON.parse(
  fs.readFileSync(new URL('./_data/reviews.json', import.meta.url), 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}

// Run in the terminal `node seeder.js -i` for importing data into DB
// Run in the terminal `node seeder.js -d` for destrying data in DB