const express = require('express');
const { dbConnectivity } = require('./Config/database');
const User = require('./Routes/userRoute')
const Quiz = require('./Routes/QuizRoute')
const Blog = require('./Routes/BlogRoute')
const Subscription = require('./Routes/SubscriptionRoute')
const PrivacyRoute = require("./Routes/PrivacyRoute");
const CompanyRoute = require("./Routes/CompanyRoute");
const JobRoute = require("./Routes/JobRoute");


const cors = require('cors');

const app = express()
app.use(express.json())
// Data base 
dbConnectivity(process.env.DB_URL)
app.use(cors());
// main Root
app.use('/api/user' , User)
app.use('/api/quiz' , Quiz)
app.use('/api/blog' , Blog)
app.use('/api/Subscription' , Subscription)
app.use("/api/privacy", PrivacyRoute);
app.use("/api/company", CompanyRoute);
app.use("/api/jobs", JobRoute);






module.exports = app