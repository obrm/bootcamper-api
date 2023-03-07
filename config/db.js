import mongoose from 'mongoose';

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;