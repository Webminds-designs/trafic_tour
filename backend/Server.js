import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConfig.js";
import morgan from "morgan";
import userRoutes from "./Routes/UserRoutes.js";
import packageRoutes from "./Routes/PackageRoutes.js";
import favoritePackageRoutes from "./Routes/FavoritePackagesRoutes.js";
import bookingRoutes from "./Routes/BookingRoutes.js";
import paymentRoutes from "./Routes/PaymentRoutes.js";
import payhereRoutes from "./Routes/PayhereRoutes.js";
import inquiriesRoutes from "./Routes/InquiriesRoutes.js";
import subscriptionRoutes from "./Routes/SubscriptionRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

import { v4 as uuidv4 } from "uuid";
import winston from "winston";

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Database connection
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by"); // Remove Express signature

// Define allowed origins dynamically based on environment
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed from this origin"));
      }
    },
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Restrict allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logger setup
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "errors.log" }), // Log errors in a file
  ],
});

app.use(morgan("combined"));

// Security headers using Helmet
app.use(
  helmet({
    xContentTypeOptions: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'", 
          "'unsafe-inline'", // This allows inline styles (not recommended unless necessary)
          'fonts.googleapis.com', // Allow styles from Google Fonts
        ],
        fontSrc: [
          "'self'", 
          'fonts.gstatic.com', // Allow fonts from Google Fonts
        ],
        frameAncestors: ["'self'"], // Blocks clickjacking
      },
    },
    frameguard: { action: "deny" }, // Prevents embedding in iframes
  })
);

app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
app.use(helmet.frameguard({ action: "sameorigin" })); 
// Custom security headers

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/favorites", favoritePackageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/payhere", payhereRoutes);
app.use("/api/send-email", inquiriesRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

app.use(errorHandler);
// Global Error Handler
app.use((err, req, res, next) => {
  const errorId = uuidv4(); // Generate a unique error ID
  logger.error({ errorId, message: err.message, stack: err.stack });

  if (process.env.NODE_ENV === "development") {
    res.status(500).json({ errorId, error: err.message, stack: err.stack });
  } else {
    res.status(500).json({ message: "Something went wrong", errorId });
  }
});
app.use((req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    if (typeof data === "string") {
      data = data.replace(
        /\b(?:10|172\.(1[6-9]|2[0-9]|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/g,
        "[REDACTED]"
      );
    }
    originalSend.call(this, data);
  };

  next();
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} in ${NODE_ENV} mode`);
});
