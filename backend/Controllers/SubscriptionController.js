import Subscription from '../Model/Subscription.js';

export const createSubscription = async (req, res) => {
    try {
      const { name, email, postalCode } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });
      if (!email) return res.status(400).json({ error: 'Email is required' });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email format' });
      
      const existingSubscription = await Subscription.findOne({ email });
      if (existingSubscription) return res.status(400).json({ error: 'Email is already subscribed' });
      
      const newSubscription = new Subscription({ name, email, postalCode });
      await newSubscription.save();
      res.status(201).json(newSubscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const signupSubscription = async (req, res) => {
    try {
      const { name, email } = req.body;
      
      // Check if email is provided
      if (!email) return res.status(400).json({ error: 'Email is required' });
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });
  
      // Check if the email already exists in the subscription database
      const existingSubscription = await Subscription.findOne({ email });
      if (existingSubscription) return res.status(400).json({ error: 'Email is already subscribed' });
  
      // Create new subscription
      const newSubscription = new Subscription({
        name: name || "",  // Use empty string if no name is provided
        email
      });
  
      // Save the subscription to the database
      await newSubscription.save();
      
      // Send success response
      res.status(201).json({
        message: 'Subscription successful',
        subscription: newSubscription
      });
    } catch (error) {
      console.error('Error during subscription:', error);  // Log the error for debugging
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};