import express from 'express';
import { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage ,searchPackages } from '../Controllers/PackageController.js';
import upload from '../config/MulterConfig.js';
const router = express.Router();


router.post('/', upload.single('image'), (req, res, next) => {
    console.log("Uploaded file:", req.file);
    next();
}, createPackage);

router.get('/', getAllPackages);
router.get('/:id', getPackageById);
router.put('/:id', upload.single('image'), updatePackage);
router.delete('/:id', deletePackage);
router.get('/find/search', searchPackages); 

export default router;
