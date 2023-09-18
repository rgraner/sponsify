require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

const passport = require('./loaders/passport');

const sponsorsRoute = require('./routes/sponsors');
const projectsRoute = require('./routes/projects');
const plansRoute = require('./routes/plans');
const checkoutRoute = require('./routes/checkout');
const authRoute = require('./routes/auth');
const paymentRoute = require('./routes/payment');

// Middleware
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

// Routes
app.use('/api/sponsors', sponsorsRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/plans', plansRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/auth', authRoute);
app.use('/api/payment', paymentRoute);


// Start the server
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

