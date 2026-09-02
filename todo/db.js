import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

async function dbConnect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
