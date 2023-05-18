const express = require('express');
require('dotenv').config()

const server = express();
const app = require('./app')

server.use(app)


server.listen(process.env.PORT || 5000 , () => {
    console.log(`Server is Running http://localhost:${process.env.PORT}`)
})