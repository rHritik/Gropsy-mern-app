import mongoose , { mongo } from "mongoose";


export const connectDB=async()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); //Exit the process with failure 
    }
}