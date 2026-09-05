import User from "./models/user.model.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import connectDb from "./connectDb.js";


dotenv.config()
const tempPassword = 'admin123'

async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    await connectDb()
    if(!ADMIN_EMAIL) {
      console.error('Missing ADMIN_EMAIL env variable');
      process.exit(1);
    }
    const existingAdmin = await User.findOne({email: process.env.ADMIN_EMAIL});
    if(existingAdmin){
      console.log("User already exists as role", existingAdmin.role)
      process.exit(0)
    }
    const hashedPassword = await bcrypt.hash(tempPassword, 10)
    const admin = await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN"
    })
    console.log('Admin user created');
    console.log('\nemail:', admin.email)
    console.log('password:', tempPassword)
    console.log('\nchange the password after login')
    process.exit(0);
  } catch (error) {
    console.error("Admin login failed", error)
  }
}

registerAdmin()