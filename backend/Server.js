import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./config/dbConfig.js";
import userRoutes from "./Routes/UserRoutes.js"


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
app.use(express.urlencoded({ extended: true }));
app.options('*', cors()); 


app.use('/api/user', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
