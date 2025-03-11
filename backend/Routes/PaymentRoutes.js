import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
} from "../Controllers/PaymentController.js";
import upload from '../config/MulterConfig.js';


const router = express.Router();

router.post("/",upload.single('receipt'), createPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentStatus);

export default router;
