import mongoose from 'mongoose'

const connectDb = async () =>{ 
  try {
    await mongoose.connect(process.env.MONGO).then(() => {console.log('Connected to MongoDB')});
  } catch (error) {
    console.error('MongoDB connection error:', err);
  }
}

export default connectDb;