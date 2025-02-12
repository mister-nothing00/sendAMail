import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "SendAnMail",
    });
    console.log("Database connected");
   
  } catch (error) {
    console.error("An error for connecting to db, retry");
    
  }
};

export default connectDB;
