import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cron from 'node-cron';
import { Task } from './models/index.mjs'

import {  userRouter,taskRouter, refreshTokenRouter } from './routes/index.mjs';
import { DB_URL, PORT } from './config/index.mjs';
// import  './utils/cornJob.mjs';

const app = express();


mongoose.connect(DB_URL)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));


// app.get('/', (req, res) => {
//     res.send('<h1>Hello</h1>');
// });
app.use(cors())
app.use(json())
app.use(userRouter)
app.use(taskRouter)
app.use(refreshTokenRouter)
  

// code to update status of Tasks
cron.schedule('* * * * *', async () => {
    try {
      
      const now = new Date();
      const result = await Task.updateMany(
        { deadline: { $lt: now }, status: { $nin: ['backlog','complete']  } },
        { $set: { status: 'backlog' } }
      );
      if(result!==undefined)
        {console.log(`Backlog status updated for ${result.nModified} overdue tasks`);}
    } catch (error) {
      console.error('Error updating backlog status:', error);
    }
  });

app.listen(3000 , () => {
    console.log(`Server is running on port ${PORT}`);
});
