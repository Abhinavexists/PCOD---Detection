// routes/authRoutes.js
const express = require('express');
const authRoutes = express.Router();
//const authController = require('../controllers/authController');
const userRoutes = require('./userRoutes');

authRoutes.use("/user", userRoutes);

//router.post('/signup', authController.signup);
//router.post('/google-signup', authController.googleSignup);

module.exports = authRoutes;
