const pool = require('../models/pool');
const bcrypt = require('bcrypt');


const sponsorRegistration = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the email is already registered
        const existingEmail = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (existingEmail.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Check if the username is already registered
        const existingUsername = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        if (existingUsername.rows.length > 0) {
            return res.status(400).json({ error: 'Username already in use' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Start a database transaction
        await pool.query('BEGIN');

        // Insert user data into the users table
        const userResult = await pool.query(
            'INSERT INTO users (username, email, password_hash, user_type)\
            VALUES ($1, $2, $3, $4) RETURNING id',
            [username, email, hashedPassword, 'sponsor']
        )

        // Commit the database transaction
        await pool.query('COMMIT');

        res.status(201).json({ message: 'Sponsor registration successful' });
    } catch (error) {
        // Rollback the database transaction in case of an error
        await pool.query('ROLLBACK');
        console.error('Sponsor registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const projectRegistration = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the email is already registered
        const existingEmail = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (existingEmail.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Check if the username is already registered
        const existingUsername = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        if (existingUsername.rows.length > 0) {
            return res.status(400).json({ error: 'Username already in use' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Start a database transaction
        await pool.query('BEGIN');

        // Insert user data into the users table
        const userResult = await pool.query(
            'INSERT INTO users (username, email, password_hash, user_type)\
            VALUES ($1, $2, $3, $4) RETURNING id',
            [username, email, hashedPassword, 'project']
        )

        // Commit the database transaction
        await pool.query('COMMIT');

        res.status(201).json({ message: 'Project registration successful' });
    } catch (error) {
        // Rollback the database transaction in case of an error
        await pool.query('ROLLBACK');
        console.error('Project registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    sponsorRegistration,
    projectRegistration
};

