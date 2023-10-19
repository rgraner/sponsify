const pool = require('../models/pool');
const bcrypt = require('bcrypt');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// Get all sponsors
const getAllSponsors = (req, res) => {
    pool.query(
      'SELECT\
      sponsors.id,\
      sponsors.name,\
      users.username,\
      users.email,\
      sponsors.description,\
      sponsors.logo,\
      users.created_at,\
      users.updated_at\
      FROM users INNER JOIN sponsors ON users.id = sponsors.user_id;',
      (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
};

// Get sponsor by id
const getSponsorById = async ( req, res) => {
  const sponsorId = parseInt(req.params.sponsorId);

  try {
      const sponsor = await pool.query(
          'SELECT\
          sponsors.id,\
          sponsors.name,\
          users.username,\
          users.email,\
          sponsors.description,\
          sponsors.logo,\
          users.created_at,\
          users.updated_at\
          FROM users INNER JOIN sponsors ON users.id = sponsors.user_id\
          WHERE sponsors.id = $1',
          [sponsorId]
      );

      if(sponsor.rows.length === 0) {
          return res.status(404).json({ message: 'Sponsor not found' });
      }

      res.status(200).json(sponsor.rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }

};

// Get sponsor by user id
const getSponsorByUserId = async ( req, res) => {
  const userId = parseInt(req.params.userId);

  try {
      const sponsor = await pool.query(
          'SELECT\
          sponsors.id AS sponsor_id,\
          sponsors.name,\
          users.username,\
          users.email,\
          sponsors.description,\
          sponsors.logo,\
          users.created_at,\
          users.updated_at\
          FROM users INNER JOIN sponsors ON users.id = sponsors.user_id\
          WHERE users.id = $1',
          [userId]
      );

      if(sponsor.rows.length === 0) {
          return res.status(404).json({ message: 'Sponsor not found' });
      }

      res.status(200).json(sponsor.rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }

};

// Get sponsors by project id
const getSponsorsByProjectId = async (req, res) => {
    const projectId = req.params.projectId;
  
    try {
      // Query the database to get the sponsor associated with the project
      const sponsorsData = await pool.query(
        'SELECT DISTINCT\
        projects.id AS project_id,\
        projects.name AS project_name,\
        sponsors.id AS sponsor_id,\
        sponsors.name AS sponsor_name,\
        sponsors.logo AS sponsor_logo,\
        orders.is_subscription_active\
        FROM projects\
        INNER JOIN orders ON orders.project_id = projects.id\
        INNER JOIN sponsors ON sponsors.id = orders.sponsor_id\
        WHERE projects.id = $1',
        [projectId]
      );
  
      if (sponsorsData.rows.length === 0) {
        return res.status(404).json({ message: 'No sponsors found for this project' });
      }

      // Process the data to group sponsors by project
      const result = {};

      sponsorsData.rows.forEach((row) => {
        const project_name = row.project_name;
        if (!result[project_name]) {
          result[project_name] = {
            project_id: row.project_id,
            project_name: project_name,
            sponsors: [],
          };
        }
        result[project_name].sponsors.push({
          sponsor_id: row.sponsor_id,
          sponsor_name: row.sponsor_name,
          sponsor_logo: row.sponsor_logo,
          is_subscription_active: row.is_subscription_active,
        });
      });
  
      // Return the sponsor's name and logo
      res.status(200).json(Object.values(result));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

const createSponsor = async (req, res) => {
  try {
      const { name, description, username, email, password } = req.body;

      // Validate input
      if (!name || !description || !username || !email || !password) {
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

      const userId = userResult.rows[0].id;
      const stripeCustomer = await stripe.customers.create({
          email: email,
          name: name
        });

      // Insert sponsor data into the sponsors table
      await pool.query(
          'INSERT INTO sponsors (user_id, name, description, stripe_customer_id)\
          VALUES ($1, $2, $3, $4)',
          [userId, name, description, stripeCustomer.id]
      );

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

// Update sponsor
const updateSponsor = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, username, email, logo } = req.body;
  
    try {
      const { rows } = await pool.query('SELECT * FROM sponsors WHERE id = $1', [id]);
      if (!rows.length) {
        return res.status(404).json({ message: 'Sponsor not found' });
      }
  
      const queryText = 'UPDATE sponsors SET name = $1, description = $2, username = $3, email = $4, logo = $5, updated_at = $6 WHERE id = $7';
      const values = [name, description, username, email, logo, new Date(), id];
  
      await pool.query(queryText, values);
      return res.status(200).json({ message: 'Sponsor updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};

const deleteSponsor = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query('DELETE FROM sponsors WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Sponsor not found' });
        }
        res.status(200).send(`Sponsor deleted with ID: ${id}`)
    })
};


module.exports = {
    getAllSponsors,
    getSponsorById,
    getSponsorByUserId,
    getSponsorsByProjectId,
    createSponsor,
    updateSponsor,
    deleteSponsor
};
