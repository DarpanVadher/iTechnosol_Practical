import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.name} `);
	} catch (error: any) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
