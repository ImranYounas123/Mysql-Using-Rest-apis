const express = require('express');
const Subscription = require('../Controllers/SubscriptionClt');
const router = express.Router();
const { authenticateToken } = require('../Middlewares/authMiddleware');


router.post('/', authenticateToken , Subscription.createSubscription);






module.exports = router;