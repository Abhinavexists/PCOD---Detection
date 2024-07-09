const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { createToken } = require("../utils/tokenMananger");
const { COOKIE_NAME } = require("../utils/tokenMananger");

const getAllUsers = async(req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({message: "OK", users});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "ERROR", cause: error.message});
  }
}

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    
    return res.status(201).json({ message: 'User registered successfully', id: user._id.toString() });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const login = async (req, res) => {
  const {email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send('User not registered');
    }

    // check the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({ message: 'User login successfully', id: user._id.toString() });

  } catch (error) {
    console.error('Error login user:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { getAllUsers, signUp, login };

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// require('dotenv').config();
 


// const registerUser = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({
//       firstName,
//       lastName,
//       email,
//       password: await bcrypt.hash(password, 10),
//     });

//     await user.save();

//     const payload = { user: { id: user.id } };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// };

// const googleAuth = async (req, res) => {
//   const { token } = req.body;

//   // Verify Google token and extract user info
//   // This example uses a mock function verifyGoogleToken to demonstrate
//   const googleUser = await verifyGoogleToken(token);

//   try {
//     let user = await User.findOne({ googleId: googleUser.sub });

//     if (!user) {
//       user = new User({
//         firstName: googleUser.given_name,
//         lastName: googleUser.family_name,
//         email: googleUser.email,
//         googleId: googleUser.sub,
//       });

//       await user.save();
//     }

//     const payload = { user: { id: user.id } };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// };

// const verifyGoogleToken = async (token) => {
//   // This function should verify the token using Google's OAuth2 client
//   // and return the user info. Here we mock it for demonstration.
//   return {
//     sub: 'google_user_id',
//     given_name: 'FirstName',
//     family_name: 'LastName',
//     email: 'user@example.com',
//   };
// };

// module.exports = {
//   registerUser,
//   googleAuth,
// };
