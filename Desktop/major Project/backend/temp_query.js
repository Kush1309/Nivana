import mongoose from 'mongoose';
import { video } from './src/models/video.model.js';
import { User } from './src/models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = "videotube";
const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log("Connected to DB successfully.");
    
    const videos = await video.find({}).lean();
    console.log("--- VIDEOS ---");
    console.log(JSON.stringify(videos, null, 2));
    
    const users = await User.find({}).lean();
    console.log("--- USERS ---");
    console.log(JSON.stringify(users.map(u => ({ _id: u._id, username: u.username, fullname: u.fullname })), null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error("Error running query:", err);
    process.exit(1);
  }
}

run();
