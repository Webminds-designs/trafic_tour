import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String, required: true, unique: true },
  postalCode: { type: String }
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;
