import { User } from '../Models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {generateCookie} from '../utils/feature.js'

export const userRegister = async (req, res) => {  // /api/users/register
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) return res.status(404).json({
    success: false,
    message: "user already exist"
  })

  const hashPassword = await bcrypt.hash(password, 10)
  user = await User.create({
    name,
    email,
    password: hashPassword
  })
  generateCookie(user,res,201,"User Register Successfully!")

}

export const userLogin =async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) return res.status(404).json({
    success: false,
    message: "user not exist"
  })

  //but of user found
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) return res.status(404).json({
    success: false,
    message: "invalid email or password"
  })

  generateCookie(user,res,201,`User login Successfully!, Hello ${user.name}`)
}


export const userLogout = async (req, res) => {
  res.status(200).cookie("token", "", {
    expires: new Date(Date.now())
  }).json({
    success: true,
    message: "logout successfully"
  })
}

export const getMyProfile = (req,res)=>{
  res.status(200).json({
      success:true,
      "message":"your profile",
      user:req.user
  })
} 

export const getUserById = async(req,res)=>{
  const id = req.params.id;

  const user = await User.findById(id);
  
  if(!user) return res.status(404).json({
      success:false,
      message:"Invalid ID"
  })


  res.json({
      success:true,
      message:"This is Single User",
      user
  })

} 
