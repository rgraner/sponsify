require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sponsorRoutes = require('./routes/sponsors');
const projectRoutes = require('./routes/projects');
const planRoutes = require('./routes/plans');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/plans', planRoutes);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



