import express from 'express';
import { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage ,searchPackages } from '../Controllers/PackageController.js';
import upload from '../config/MulterConfig.js';
const router = express.Router();


router.post(
    '/',
    upload.array('image', 5), 
    (req, res, next) => {
      console.log("Uploaded files:", req.files);
      next();
    },
    createPackage
  );
  
router.get('/', getAllPackages);
router.get('/:id', getPackageById);
router.put('/:id', upload.array('image', 5), updatePackage);
router.delete('/:id', deletePackage);
router.get('/find/search', searchPackages); 

export default router;