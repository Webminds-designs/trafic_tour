import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import connectDB from "./config/dbConfig.js";
import userRoutes from "./Routes/UserRoutes.js"
import packageRoutes from "./Routes/PackageRoutes.js";


dotenv.config(); // Load environment variables

// Get the port from .env or default to 5000
const PORT = process.env.PORT || 5000;

connectDB(); // Connect to the database

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Allow only the frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers that you need
}));


// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'http://localhost:5173',  
  credentials: true,                
};
app.use(cors(corsOptions));


app.use('/api/user', userRoutes);
app.use("/api/packages", packageRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
