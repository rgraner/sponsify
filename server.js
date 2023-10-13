require('dotenv').config();
const path = require('path');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

const passport = require('./server/loaders/passport');

const sponsorsRoute = require('./server/routes/sponsors');
const projectsRoute = require('./server/routes/projects');
const plansRoute = require('./server/routes/plans');
const checkoutRoute = require('./server/routes/checkout');
const authRoute = require('./server/routes/auth');
const paymentRoute = require('./server/routes/payment');

// Routes
app.use('/api/sponsors', sponsorsRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/plans', plansRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/auth', authRoute);
app.use('/api/payment', paymentRoute);

// Middleware
app.use(express.static(path.join(__dirname, 'views', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'build', 'index.html'));
});
app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(passport.initialize());



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

