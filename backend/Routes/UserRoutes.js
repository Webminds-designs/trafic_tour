import express from 'express';
import { registerUser,googleRegisterUser,  loginUser,googleloginUser, updateUserProfile, deleteUser ,findUserByEmail ,authMiddleware, getCurrentUser, logoutUser } from '../Controllers/UserController.js';

import upload from '../config/MulterConfig.js';

const router = express.Router();

// Public routes
router.post('/register',upload.single('image'), registerUser);
router.post('/Googleregister', googleRegisterUser);
router.post('/login', loginUser);
router.post('/Googlelogin', googleloginUser);

router.post('/findemail', findUserByEmail);

// Protected routes 
router.get('/auth', authMiddleware, getCurrentUser);
router.post('/logout', logoutUser);
router.put('/profile',updateUserProfile);
router.delete('/profile', deleteUser);

export default router;
