const express = require('express');
const router = express.Router();
const {otp,user} = require('../Controllers/UserController');
const { authenticateToken } = require('../Middlewares/authMiddleware');

// Sign up a new user
router.post('/signup', user.signUp);
// Log in an existing user
router.post('/login', user.login);


// otp section
router.post('/otp', otp.sendOtp);
router.post('/verify', otp.verifyOtp);



module.exports = router;