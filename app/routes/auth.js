// import express from 'express';
// import Controller from '../controllers/controller';
// import Validator from '../middleware/validator';

// const router = express.Router();

// // POST: Login
// router.post('/login',
//   Validator.validateLogin,
//   Controller.login);

// // POST: Signup
// router.post('/signup',
//   Validator.validateSignup,
//   Controller.signup);

// export default router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route for user signup
router.post('/signup', async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password } = req.body;

        // Perform server-side validation
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
