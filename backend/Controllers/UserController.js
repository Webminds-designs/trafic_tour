import User from "../Model/User.js";
import cloudinary from "../config/CloudinaryConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/errorResponse.js";


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
    const token = jwt.sign(  {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      country: user.country,
      passportId: user.passportId,
      role: user.role,
      profileUrl: user.profileUrl,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
       password:user.password,
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
     const token = jwt.sign(  {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      country: user.country,
      passportId: user.passportId,
      role: user.role,
      profileUrl: user.profileUrl,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
        password:user.password,
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
export const getUserDetails = async (req, res) => {
  const { userId } = req.params; // Get the userId from the URL parameters

  try {
    const user = await User.findById(userId); // Find the user in the database by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user }); // Return the user details as JSON
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({ users }); // Return all users as JSON
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateUserProfile =  async (req, res) => {
 
  const { userId } = req.body; // Get userId from request body
  const { firstName, lastName, email, passportId, phone } = req.body; // Get form data from request body
  try {
    const user = await User.findById(userId); // Find the user by userId

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.passportId = passportId || user.passportId;
    user.phone = phone || user.phone;

    await user.save(); // Save the updated user

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

export const updateImage = async (req, res) => {
  try {
    // Log request body and file for debugging
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    // Extract userId from the request
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (req.file) {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const newProfileUrl = result.secure_url;

      // Find the user by userId and update the profile URL
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user's profile URL
      user.profileUrl = newProfileUrl;
      await user.save();  // Save the updated user document

      res.status(200).json({ message: 'Profile image uploaded successfully', profileUrl: newProfileUrl });
    } else {
      res.status(400).json({ message: 'No image uploaded' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const newpassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ message: 'User ID and new password are required.' });
  }

  try {
    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user's password (will be hashed automatically in the pre-save hook)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const updatePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'User ID, old password, and new password are required.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the old password is correct
    const isMatch = await user.isPasswordValid(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect.' });
    }

    // Update password (will be hashed automatically in the pre-save hook)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};


// Delete user
export const deleteUser = async (req, res) => {
  const { userId } = req.params; // Get the userId from the URL params

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
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

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Retrieve token from cookies
    if (!token) {
      return next(new ErrorResponse("No token provided", 401));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    console.error("Token verification failed:", err);
    return next(new ErrorResponse("Invalid or expired token", 401));
  }
};

// Get the current authenticated user
export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email) {
      return next(new ErrorResponse("Unauthorized", 401));
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Return user details
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
  } catch (err) {
    console.error("Error fetching user details:", err);
    next(new ErrorResponse("Server error", 500));
  }
};

// Register a new user from admin
export const registerUserAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, phone,  passportId, password } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!firstName) {
      return res.status(400).json({ message: "First name is required" });
    }
    if (!lastName) {
      return res.status(400).json({ message: "Last name is required" });
    }
    if (!phone) {
      return res.status(400).json({ message: "phone is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Cloudinary - Image upload if available
    let profileUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path); 
      profileUrl = result.secure_url;
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      passportId,
      role: "user", // Default role
      password,
      profileUrl, // Cloudinary URL for the profile image
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateUserProfileAndImage = async (req, res) => {
  try {
    // Extract userId and form data from request body
    const { _id, firstName, lastName, email, passportId, phone } = req.body;
    console.log(req.body)
    if (!_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find the user by userId
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields if provided
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.passportId = passportId || user.passportId;
    user.phone = phone || user.phone;

    // Check if a file (image) was uploaded
    if (req.file) {
      console.log('Uploaded File:', req.file);
      const result = await cloudinary.uploader.upload(req.file.path);
      user.profileUrl = result.secure_url;
    }

    await user.save(); // Save the updated user data

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true });
  res.status(200).json({ message: 'Logged out successfully' });
};