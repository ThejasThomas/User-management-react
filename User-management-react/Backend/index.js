const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const cors = require("cors")
const path = require("path")
const cookieParser = require('cookie-parser'); 
const app = express()
const userRoute = require("./routes/userRoute")
const adminRoute = require("./routes/adminRoutes")

app.use(cookieParser());
dotenv.config();
app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:5173', //frontend URL
    credentials: true, // Allow credentials (cookies, headers, etc.)
  };
  
  app.use(cors(corsOptions));

mongoose.connect("mongodb://localhost:27017/USM_react")
   .then(()=>{
    console.log(`MongoDB connected successfully to ${mongoose.connection.name}`)
   })
   .catch(err=>{
    console.error('MongoDB connection error:', err);
   })

   app.use('/uploads', express.static(path.join(__dirname, 'multer', 'uploads')));
   app.use('/uploads', express.static('uploads'));

   app.use("/user",userRoute)
   app.use("/admin",adminRoute)   

   app.listen("3000", ()=>{
    console.log("server started")
   })