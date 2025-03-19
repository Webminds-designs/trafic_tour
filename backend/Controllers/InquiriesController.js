import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Email from "../Model/Inquiries.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ✅ Function to send an email
export const sendEmail = async (req, res) => {
  const { from, to, subject, text } = req.body;

  try {
    const info = await transporter.sendMail({ from, to, subject, text });

    // Save email details in MongoDB
    const emailData = new Email({ from, to, subject, text, status: "sent" });
    await emailData.save();

    res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    console.error(error);

    // Save failed email attempt
    const failedEmail = new Email({
      from,
      to,
      subject,
      text,
      status: "failed",
      errorMessage: error.message,
    });

    await failedEmail.save();
    res.status(500).json({ message: "Failed to send email", error });
  }
};

// ✅ Function to reply to an email
export const replyToEmail = async (req, res) => {
  const { emailId, replyText } = req.body;

  try {
    // Find the original email
    const originalEmail = await Email.findById(emailId);
    if (!originalEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Send the reply
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: originalEmail.from, // Reply to sender
      subject: `Re: ${originalEmail.subject}`,
      text: replyText,
    });

    // Update email with reply details
    originalEmail.reply = { text: replyText, date: new Date() };
    await originalEmail.save();

    res.status(200).json({ message: "Reply sent successfully", info });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send reply", error });
  }
};

// ✅ Function to get all emails (for admin panel)
export const getEmails = async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.status(200).json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch emails", error });
  }
};
