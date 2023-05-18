const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    default: Date.now,
    index: { expires: '60s' },
  },
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
