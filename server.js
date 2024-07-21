import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.js'
import blogRouter from './routes/blog.js'
import { config } from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
 

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true     //to save cookie in browser
}))

config({
  path:'./data/config.env'
})


mongoose.connect(process.env.MONGO_URL,{
  dbName:"webdevBlog"
}).then(()=>console.log("MongoDB is Connected!"))


// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       dbName:"webdevBlog",
//       serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
//     });
//     console.log('MongoDB Connected!');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };
// connectDB();



//user router
app.use('/api/users', userRouter);

//blog router
app.use('/api/blogs', blogRouter);

const PORT=process.env.PORT;

app.listen(PORT,()=>console.log(`Server is running on Port ${PORT}`))