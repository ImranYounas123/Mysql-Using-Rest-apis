const jwt = require('jsonwebtoken');
const User = require('../Models/Auth/UserModel');
const bcrypt = require('bcryptjs')
const UserServices = require('../services/authServices');
const { CatchAsyncError } = require('../utills/CachAsyncErro');
const OTP = require('../Models/Auth/OtpModel');

const userService = new UserServices();
class UserController {
  async signUp(req, res) {
    try {
      // Check if the user already exists
      // let {email , password} = req.body;
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      const newUser = await user.save();
      // new UserServices 
      let token = userService.generateUserToken(newUser._id)
      // Generate a JWT token
      // const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token, newUser });
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong',
        Error: err.stack
      });
    }
  }

  async login(req, res) {
    try {
      // Check if the user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      let token = userService.generateUserToken(user._id)
      let otp = userService.generateOtp()
      console.log(otp)

      res.status(200).json({ email: user.email, name: user.name, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}
// otp class
class Otp {
  constructor() {

  }
  async sendOtp(req, res) {
    try {
      // Check if the user exists
      let { email } = req.body;
      let otp = userService.generateOtp()

      let sendEmail = userService.sendOtpUsingEmail(email , otp)

      // if (phone.startsWith('0')) {
      //   phone = '+92' + phone.slice(1);
      // }
      // let checkExit = await OTP.findOne({phone : phone})
      // console.log(Array.isArray(checkExit))
      // let otpCode = userService.generateOtp()
      // // userService.sendOtpUsingTwilio(phone , otpCode)
      // let otp = await OTP.create({
      //   phone: phone,
      //   otp: otpCode
      // })

      res.status(200).json({ sendEmail });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  async verifyOtp(req, res) {
    try {
      // Check if the user exists
      const { otpCode } = req.body;
      let checkExit = await OTP.findOne({otp : otpCode })
      if(checkExit){
        return res.status(200).json({ message: 'OTP verified Successfully' });
      }
       res.status(401).json({ message: 'OTP expired' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}
const user = new UserController();
const otp = new Otp();
module.exports = {
  user,
  otp
}
