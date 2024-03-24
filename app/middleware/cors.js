const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from all origins
app.use(cors());

// Your routes and other middleware configurations...

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
