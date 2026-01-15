import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected:", connect.connection.name);
        console.log("Host:", connect.connection.host);
    }catch(error){
        console.error("MongoDB Connection Error:", error.message);
        console.error("Full error:", error);
        process.exit(1);
    };
};

export default connectDB;