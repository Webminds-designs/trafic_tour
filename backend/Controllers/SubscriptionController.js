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
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: 'Email is required' });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email format' });
      
      const existingSubscription = await Subscription.findOne({ email });
      if (existingSubscription) return res.status(400).json({ error: 'Email is already subscribed' });
      
      const newSubscription = new Subscription({ email });
      await newSubscription.save();
      res.status(201).json(newSubscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
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