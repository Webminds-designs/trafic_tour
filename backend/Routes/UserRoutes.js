import express from 'express';
import { registerUser,googleRegisterUser,registerUserAdmin, getAllUsers , loginUser,googleloginUser, updateUserProfile, deleteUser ,findUserByEmail ,authMiddleware, getCurrentUser, logoutUser ,getUserDetails , updateImage ,newpassword  , updatePassword, updateUserProfileAndImage} from '../Controllers/UserController.js';

import upload from '../config/MulterConfig.js';

const router = express.Router();

// Public routes
router.post('/register',upload.single('image'), registerUser);
router.post('/Googleregister', googleRegisterUser);
router.post('/login', loginUser);
router.post('/Googlelogin', googleloginUser);

router.post('/findemail', findUserByEmail);
router.post('/newpassword', newpassword);
router.post('/updatepassword', updatePassword);

router.put('/updateurl',upload.single('image'), updateImage);

//for Admin page
router.get('/', getAllUsers);
router.post('/newregister',upload.single('avatar'), registerUserAdmin);
router.post('/update', upload.single('avatar'), updateUserProfileAndImage);


// Protected routes 
router.get('/:userId', getUserDetails);
router.get('/auth', authMiddleware, getCurrentUser);
router.post('/logout', logoutUser);
router.put('/profile',updateUserProfile);
router.delete('/:userId', deleteUser);

export default router;
