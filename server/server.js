require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sponsorsRoute = require('./routes/sponsors');
const projectsRoute = require('./routes/projects');
const plansRoute = require('./routes/plans');
const cartRoute = require('./routes/cart');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/sponsors', sponsorsRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/plans', plansRoute);
app.use('/api/cart', cartRoute);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



