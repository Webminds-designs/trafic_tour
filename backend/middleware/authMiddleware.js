import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Middleware to authenticate users
export const authenticate = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    // Attach decoded user info (e.g., id, role) to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

  }
};

// Middleware to authorize specific roles (e.g., admin, teacher, student)
export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      // Ensure the user's role matches one of the authorized roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message:
            "Access denied. You do not have permission to perform this action.",
        });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Authorization Error:", error.message);
      return res.status(403).json({
        message: "Access denied due to an authorization error.",
      });
    }
  };
};
