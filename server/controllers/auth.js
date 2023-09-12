// const pool = require('../models/pool');
// const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');


// const sponsorRegistration = async (req, res) => {
//     try {
//         const { name, description, logo, username, email, password } = req.body;

//         // Validate input
//         if (!name || !description || !logo || !username || !email || !password) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Check if the email is already registered
//         const existingEmail = await pool.query(
//             'SELECT * FROM users WHERE email = $1',
//             [email]
//         );
//         if (existingEmail.rows.length > 0) {
//             return res.status(400).json({ error: 'Email already in use' });
//         }

//         // Check if the username is already registered
//         const existingUsername = await pool.query(
//             'SELECT * FROM users WHERE username = $1',
//             [username]
//         );
//         if (existingUsername.rows.length > 0) {
//             return res.status(400).json({ error: 'Username already in use' });
//         }

//         // Hash the password
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         // Start a database transaction
//         await pool.query('BEGIN');

//         // Insert user data into the users table
//         const userResult = await pool.query(
//             'INSERT INTO users (username, email, password_hash, user_type)\
//             VALUES ($1, $2, $3, $4) RETURNING id',
//             [username, email, hashedPassword, 'sponsor']
//         )

//         const userId = userResult.rows[0].id;
//         const stripeCustomer = await stripe.customers.create({
//             email: email,
//             description: description
//           });

//         // Insert sponsor data into the sponsors table
//         await pool.query(
//             'INSERT INTO sponsors (user_id, name, description, logo, stripe_customer_id)\
//             VALUES ($1, $2, $3, $4, $5)',
//             [userId, name, description, logo, stripeCustomer.id]
//         );

//         // Commit the database transaction
//         await pool.query('COMMIT');

//         res.status(201).json({ message: 'Sponsor registration successful' });
//     } catch (error) {
//         // Rollback the database transaction in case of an error
//         await pool.query('ROLLBACK');
//         console.error('Sponsor registration error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// const projectRegistration = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Validate input
//         if (!username || !email || !password) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Check if the email is already registered
//         const existingEmail = await pool.query(
//             'SELECT * FROM users WHERE email = $1',
//             [email]
//         );
//         if (existingEmail.rows.length > 0) {
//             return res.status(400).json({ error: 'Email already in use' });
//         }

//         // Check if the username is already registered
//         const existingUsername = await pool.query(
//             'SELECT * FROM users WHERE username = $1',
//             [username]
//         );
//         if (existingUsername.rows.length > 0) {
//             return res.status(400).json({ error: 'Username already in use' });
//         }

//         // Hash the password
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         // Start a database transaction
//         await pool.query('BEGIN');

//         // Insert user data into the users table
//         const userResult = await pool.query(
//             'INSERT INTO users (username, email, password_hash, user_type)\
//             VALUES ($1, $2, $3, $4) RETURNING id',
//             [username, email, hashedPassword, 'project']
//         )

//         // Commit the database transaction
//         await pool.query('COMMIT');

//         res.status(201).json({ message: 'Project registration successful' });
//     } catch (error) {
//         // Rollback the database transaction in case of an error
//         await pool.query('ROLLBACK');
//         console.error('Project registration error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {  return next(err); }
        if (!user) { return res.status(401).json({ message: 'invalid credentials' }); }
    
        req.login(user, (err) => {
          if (err) { return next(err); }
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
          res.cookie('token', token);
          return res.status(200).json({ message: 'Login successfull', user: req.user });
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error(err);
            return next(err);
      }
      res.redirect('/');
    });
};
  
  
const check = (req, res) => {
    const token = req.cookies.token; // Get the token from the 'token' cookie

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userId = decodedToken.userId;
            res.json({ id: userId });
        } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = {
    // sponsorRegistration,
    // projectRegistration,
    login,
    logout,
    check
};

