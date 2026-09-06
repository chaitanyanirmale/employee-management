import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import multer from 'multer';
import authRouter from './routes/auth.routes.js';
import employeeRouter from './routes/employee.routes.js';
import profileRouter from './routes/profile.routes.js';
import attendanceRouter from './routes/attendance.route.js';
import leaveRouter from './routes/leave.route.js';
import payslipRouter from './routes/payslip.router.js';
import dashboardRouter from './routes/dashboard.route.js';
import connectDb from './connectDb.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(multer().none());

app.get("/", (req, res) => res.send("Server is running"))

app.use('/api/auth', authRouter)
app.use('/api/employees', employeeRouter)
app.use('/api/profile', profileRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/payslips', payslipRouter)
app.use('/api/dashboard', dashboardRouter)

await connectDb();
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))