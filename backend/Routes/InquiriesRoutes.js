import express from "express";
import { sendEmail, replyToEmail, getEmails } from "../Controllers/InquiriesController.js";

const router = express.Router();

// Route to send an email
router.post("/", sendEmail);

// Route to reply to an email
router.post("/reply", replyToEmail);

// Route to get all emails (for admin panel)
router.get("/all", getEmails);

export default router;
