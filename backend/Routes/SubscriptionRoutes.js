import express from 'express';
import { createSubscription, getAllSubscriptions ,signupSubscription} from '../Controllers/SubscriptionController.js';

const router = express.Router();


router.post('/', createSubscription);
router.post('/signup', signupSubscription);

router.get('/', getAllSubscriptions);

export default router;
