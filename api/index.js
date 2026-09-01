import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer';

dotenv.config()
mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(multer().none());

app.get("/", (req, res) => res.send("Server is running"))

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))