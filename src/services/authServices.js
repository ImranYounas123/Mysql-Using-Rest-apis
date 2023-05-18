const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const sId = process.env.TWILIO_SID
const tToken = process.env.TWILIO_TOKEN
const twilio = require('twilio')(sId, tToken)
const nodemailer = require('nodemailer');
// TWILLIO_PHONE_NO
class User {
    constructor() {
        // Initialize any required dependencies or state here
    }
    generateUserToken(userId) {
        return jwt.sign({ userId: userId._id }, process.env.JWT_SECRET, { expiresIn: '15d' });
    }
    generateOtp() {
        return crypto.randomInt(9999)
    }
    sendOtpUsingTwilio(phoneNo, otp) {
        twilio.messages
            .create({
                body: `Hi hello this is Your Otp ${otp}`,
                from: process.env.TWILIO_PHONE_NO,
                to: phoneNo // Replace with the recipient's phone number
            })
    }
    async sendOtpUsingEmail(email, otp) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: 'Programmer@123'
            }
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}. This OTP will expire in 5 minutes.`
        });
        return info
    }
}

module.exports = User;
