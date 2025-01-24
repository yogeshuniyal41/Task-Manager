import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import {  userRouter,taskRouter, refreshTokenRouter } from './routes/index.mjs';
import path from ('path');
dotenv.config()

const app = express();
 let DB_URL = process.env.DB_URL;
 let PORT = process.env.PORT;

mongoose.connect(DB_URL)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));


// app.get('/', (req, res) => {
//     res.send('<h1>Hello</h1>');
// });
const corsOptions = {
    origin: 'https://task-manager-n2x2.onrender.com', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(json())
app.use(userRouter)
app.use(taskRouter)
app.use(refreshTokenRouter)
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));});

// code to update status of Tasks
// cron.schedule('* * * * *', async () => {
//     try {
      
//       const now = new Date();
//       const result = await Task.updateMany(
//         { deadline: { $lt: now }, status: { $nin: ['backlog','complete']  } },
//         { $set: { status: 'backlog' } }
//       );
//       if(result!==undefined)
//         {console.log(`Backlog status updated for ${result.nModified} overdue tasks`);}
//     } catch (error) {
//       console.error('Error updating backlog status:', error);
//     }
//   });

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});
