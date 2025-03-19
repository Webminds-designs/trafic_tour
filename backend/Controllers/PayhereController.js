import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

// Function to generate hash for PayHere Onsite Checkout
const generateHash = async (req, res) => {
    try {
        
        const { order_id, amount } = req.body;

        if (!order_id || !amount) {
            console.error("Missing required fields");
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const merchant_id = process.env.PAYHERE_MERCHANT_ID;
        const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;

        if (!merchant_id || !merchant_secret) {
            console.error("PAYHERE_MERCHANT_ID or PAYHERE_MERCHANT_SECRET is missing in .env");
            return res.status(500).json({ success: false, message: "Server configuration error" });
        }

        // Ensure amount has two decimal places
        const formattedAmount = Number(amount).toFixed(2);

        //Generate Merchant Secret Hash (MD5 & Uppercase)
        const merchantSecretHash = crypto.createHash("md5").update(merchant_secret.trim()).digest("hex").toUpperCase();

        // Generate Final Hash
        const hashString = `${merchant_id}${order_id}${formattedAmount}LKR${merchantSecretHash}`;
        const hash = crypto.createHash("md5").update(hashString).digest("hex").toUpperCase();

        res.json({
            success: true,
            merchant_id,
            hash,
        });
    } catch (error) {
        console.error("Hash Generation Error:", error);
        res.status(500).json({ success: false, message: "Hash generation failed" });
    }
};


// Function to handle PayHere redirect-based payments
const initiatePayment = async (req, res) => {
    try {
        console.log("Received Payment Request:", req.body);

        const { order_id, amount, first_name, last_name, email, phone, items } = req.body;

        if (!order_id || !amount || !first_name || !email || !phone || !items) {
            console.error("Missing required fields");
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const merchant_id = process.env.PAYHERE_MERCHANT_ID;
        const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;

        if (!merchant_id || !merchant_secret) {
            console.error("PAYHERE_MERCHANT_ID or PAYHERE_MERCHANT_SECRET is missing in .env");
            return res.status(500).json({ success: false, message: "Server configuration error" });
        }

        const return_url = "http://localhost:5174/payment-success";
        const cancel_url = "http://localhost:5174/payment-failed";
        const notify_url = "http://localhost:5000/api/payhere/notify";

        //Generate the PayHere hash
        const merchantSecretHash = crypto.createHash("md5").update(merchant_secret.trim()).digest("hex").toUpperCase();
        const formattedAmount = Number(amount).toFixed(2); // Ensure two decimal places
        const hashString = `${merchant_id}${order_id}${formattedAmount}LKR${merchantSecretHash}`;
        const hash = crypto.createHash("md5").update(hashString).digest("hex").toUpperCase();

        // Construct the full PayHere Redirect URL
        const payhereUrl = `https://sandbox.payhere.lk/pay/checkout?merchant_id=${merchant_id}&return_url=${encodeURIComponent(return_url)}&cancel_url=${encodeURIComponent(cancel_url)}&notify_url=${encodeURIComponent(notify_url)}&order_id=${order_id}&items=${encodeURIComponent(items)}&amount=${formattedAmount}&currency=LKR&first_name=${encodeURIComponent(first_name)}&last_name=${encodeURIComponent(last_name)}&email=${encodeURIComponent(email)}&phone=${phone}&address=Colombo&city=Colombo&country=Sri Lanka&delivery_address=Colombo&delivery_city=Colombo&delivery_country=Sri Lanka&hash=${hash}`;


        res.json({ success: true, url: payhereUrl });

    } catch (error) {
        console.error("PayHere Payment Error:", error);
        res.status(500).json({ success: false, message: "Payment initialization failed" });
    }
};

export { initiatePayment, generateHash };