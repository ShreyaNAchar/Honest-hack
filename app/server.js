// import express from 'express';
// import dotenv from 'dotenv';
// import path from 'path';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import expressUploader from 'express-fileupload';
// import multer from 'multer';
// import axios from 'axios';
// import Constants from '../utils/constants.js';

// import IncidentType from './middleware/incidentType.js';

// import routerIncidents from './routes/incidents.js';
// import routerAuth from './routes/auth.js';
// import routerUser from './routes/users.js';


// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || '3000';

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'uploads')));
// app.use(expressUploader({ createParentPath: false }));

// // Define routes to home page and API welcome message
// app.get('/', (req, res) => {
//   res.status(Constants.STATUS_OK).json({ message: Constants.MESSAGE_WELCOME_HOME });
// });

// app.get('/api/v1', (req, res) => {
//   res.status(Constants.STATUS_OK).json({ message: Constants.MESSAGE_WELCOME_HACKER });
// });

// // Define routes for handling incidents (red-flags and interventions)
// app.use('/api/v1/interventions', IncidentType.setIntervention, routerIncidents);
// app.use('/api/v1/red-flags', IncidentType.setRedFlag, routerIncidents);
// app.use('/api/v1/incidents', IncidentType.setAll, routerIncidents);

// // Define route for user authentication
// app.use('/api/v1/auth/', routerAuth);

// // Define routes for user management
// app.use('/api/v1/users', IncidentType.setAll, routerUser);

// // Define route for file uploads
// const upload = multer({ dest: 'uploads/' });
// app.post('/api/v1/upload', upload.single('file'), (req, res) => {
//     // Handle uploaded file
//     console.log(req.file);
//     res.status(Constants.STATUS_OK).json({ message: 'File uploaded successfully.' });
// });

// // Define route for report submissions
// // Define route to handle report submission
// app.post('/api/v1/submit', (req, res) => {
//   try {
//       // Extract report details from request body
//       const { title, comment, type, address } = req.body;

//       // Perform validation (e.g., check if required fields are present)
//       if (!title || !comment || !type || !address) {
//           return res.status(400).json({ error: 'Missing required fields' });
//       }

//       // For testing purposes, log the report details
//       console.log('Report Details:');
//       console.log('Title:', title);
//       console.log('Comment:', comment);
//       console.log('Type:', type);
//       console.log('Address:', address);

//       // Respond with success message
//       res.status(200).json({ message: 'Report submitted successfully' });
//   } catch (error) {
//       // Handle any errors
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(Constants.STATUS_INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// export default app;
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Register route
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
