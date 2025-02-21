import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } from '../Controllers/UserController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js'; // Middleware for authentication
import upload from '../config/MulterConfig.js';

const router = express.Router();

// Public routes
router.post('/register',upload.single('image'), registerUser);
router.post('/login', loginUser);

// Protected routes 
router.get('/profile',authenticate, authorize("user"), getUserProfile);
router.put('/profile',authenticate, authorize("user"), updateUserProfile);
router.delete('/profile',authenticate, authorize("user","admin"), deleteUser);

export default router;
