import dotenv from "dotenv";
import app from "./app";
import connectDB from "./configs/db";

// Load environment variables from .env file
dotenv.config();

// Application PORT From .env
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
