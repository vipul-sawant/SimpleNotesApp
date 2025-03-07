import { config } from "dotenv";
const envData = config();

const mode = process.env.NODE_ENV;
console.log("Current Mode:", mode);

if (mode === "development") {
    
    console.log('server envData :',envData);
}

import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const connectToDB = async () => {
        try {

            const connectionAttemp = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`);
            
            // console.log("✅ MongoDB Connected Successfully! 🎉"); // <-- Success message
            return connectionAttemp;
        } catch (error) {

            throw new ApiError(500, "MongoDB Connection Failed", error);;
        }
};

export default connectToDB;