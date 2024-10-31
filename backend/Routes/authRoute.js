const express = require('express');

const authRouter = express.Router();
const { loginUser, register } = require("../Controller/authController");


authRouter
    .route("/login")
    .post(loginUser)
    
authRouter
    .route("/register")
    .post(register)


module.exports = authRouter;
