const express = require('express');
const { validate, signupValidator, loginValidator } = require("../middlewares/validator");
//const { registerUser, googleAuth } = require('../controllers/userController');

const userRoutes = express.Router();
const userController = require('../controllers/userController')

userRoutes.get("/", userController.getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userController.signUp);
userRoutes.post("/login", validate(loginValidator), userController.login);
//router.post('/register', registerUser);
//router.post('/google-auth', googleAuth);

module.exports = userRoutes;
