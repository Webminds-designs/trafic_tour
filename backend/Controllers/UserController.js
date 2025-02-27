import User from "../Model/User.js";
import cloudinary from "../config/CloudinaryConfig.js";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { email, password, comfirmpassword } = req.body;

    // Validate
    if (!email) {
      return res.status(400).json({ message: " Email are required" });
    }
    if (!password) {
      return res.status(400).json({ message: " password are required" });
    }
    if (!comfirmpassword) {
      return res.status(400).json({ message: "Comform password are required" });
    }
    if (password !== comfirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    {
      /*  //Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path); 
      newProfileUrl = result.secure_url;
    }
*/
    }
    // Create new user
    const newUser = new User({
      firstName: "",
      lastName: "",
      email,
      phone: "",
      country: "",
      passportId: "",
      role: "user",
      password,
      profileUrl: "", // Google or Cloudinary URL
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
//Google Register a new user
export const googleRegisterUser = async (req, res) => {
  try {
    const { email, profileUrl, firstName, lastName } = req.body;

    // Validate
    if (!email) {
      return res.status(400).json({ message: " Email are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const newUser = new User({
      firstName: firstName || "",
      lastName: lastName || "",
      email,
      phone: "",
      country: "",
      passportId: "",
      role: "user",
      password: "",
      profileUrl: profileUrl || "", // Google or Cloudinary URL
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await user.isPasswordValid(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ email: user.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
     httpOnly: true,  // This prevents client-side access to the cookie
     secure: process.env.NODE_ENV === 'production',  // Set to true if you're using HTTPS
     sameSite: 'Strict',  // Prevents the cookie from being sent with cross-site requests
   });

   res.status(200).json({
     status: true,
     message: 'Login successful',
     user: {
       id: user._id,
       firstName: user.firstName,
       lastName:user.lastName,
       phone:user.phone,
       email: user.email,
       country:user.country,
       passportId:user.passportId,
       role: user.role,
       profileUrl:user.profileUrl,
     },
   });
  } catch (error) {
    console.error("Login Error:", error); // Log the actual error
    res.status(500).json({
      message: "Server error",
      error: error.message || "Something went wrong",
    });
  }
};

//login user
export const googleloginUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

     // Generate token
     const token = jwt.sign({ email: user.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
     res.cookie('token', token, {
      httpOnly: true,  // This prevents client-side access to the cookie
      secure: process.env.NODE_ENV === 'production',  // Set to true if you're using HTTPS
      sameSite: 'Strict',  // Prevents the cookie from being sent with cross-site requests
    });
 
    res.status(200).json({
      status: true,
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName:user.lastName,
        phone:user.phone,
        email: user.email,
        country:user.country,
        passportId:user.passportId,
        role: user.role,
        profileUrl:user.profileUrl,
      },
    });
  } catch (error) {
    console.error("Login Error:", error); // Log the actual error
    res.status(500).json({
      message: "Server error",
      error: error.message || "Something went wrong",
    });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, country, profileUrl } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone, country, profileUrl },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Find user by email using req.body
export const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ exists: true, message: "Email already in use" });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


//verify user
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;  // Token is retrieved from cookies
    if (!token) {
      return res.json({ status: false, message: "No token provided" });
    }

    // Verify the token using jsonwebtoken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user information to the request object
    next();  // Proceed to the next route handler
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.json({ status: false, message: "Invalid or expired token" });
  }
};

// Get the current authenticated user
export const getCurrentUser = (req, res) => {
  // Ensure the user information exists in the request (i.e., decoded token)
  if (!req.user || !req.user.email) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  User.findOne({ email: req.user.email })  // Find the user based on the decoded token's email
    .then((user) => {
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });  // 404 Not Found
      }

      // Return account summary information
      res.json({
        status: true,
        message: "Authorized",
        user: {
          id: user._id,
          firstName: user.firstName,
          email: user.email,
          role: user.role,
        },
      });
    })
    .catch((err) => {
      console.error("Error fetching user details:", err);
      res.status(500).json({ status: false, message: "Server error" });  // 500 Internal Server Error
    });
};

export const logoutUser = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true });
  res.status(200).json({ message: 'Logged out successfully' });
};