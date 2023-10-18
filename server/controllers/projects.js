const pool = require('../models/pool');
const bcrypt = require('bcrypt');


// Get all projects
const getAllProjects = (req, res) => {
    pool.query(
      'SELECT\
      projects.id,\
      projects.name,\
      users.username,\
      users.email,\
      projects.description,\
      projects.logo,\
      users.created_at,\
      users.updated_at\
      FROM users INNER JOIN projects ON users.id = projects.user_id',
      (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
};

// Get project by ID
const getProjectById = async ( req, res) => {
    const projectId = parseInt(req.params.projectId);

    try {
        const project = await pool.query(
          'SELECT\
          projects.id,\
          projects.name,\
          users.username,\
          users.email,\
          projects.description,\
          projects.logo,\
          users.created_at,\
          users.updated_at\
          FROM users INNER JOIN projects ON users.id = projects.user_id\
          WHERE projects.id = $1',
          [projectId]
        );

        if(project.rows.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get project by user ID
const getProjectByUserId = async ( req, res) => {
  const userId = parseInt(req.params.userId);

  try {
      const project = await pool.query(
        'SELECT\
        projects.id AS project_id,\
        projects.name,\
        users.username,\
        users.email,\
        projects.description,\
        projects.logo,\
        users.created_at,\
        users.updated_at\
        FROM users INNER JOIN projects ON users.id = projects.user_id\
        WHERE users.id = $1',
        [userId]
      );

      if(project.rows.length === 0) {
          return res.status(404).json({ message: 'Project not found' });
      }

      res.status(200).json(project.rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }

};

// Get projects by sponsor id
const getProjectsBySponsorId = async (req, res) => {
    const sponsorId = req.params.sponsorId;
  
    try {
      // Query the database to get the projects associated with the sponsor
      const projectsData = await pool.query(
        'SELECT DISTINCT\
        sponsors.id AS sponsor_id,\
        sponsors.name AS sponsor_name,\
        projects.id AS project_id,\
        projects.name AS project,\
        projects.logo AS project_logo\
        FROM sponsors\
        INNER JOIN orders ON orders.sponsor_id = sponsors.id\
        INNER JOIN projects ON orders.project_id = projects.id\
        WHERE sponsors.id = $1;',
        [sponsorId]
      );
  
      if (projectsData.rows.length === 0) {
        return res.status(404).json({ message: 'No projects found for this sponsor' });
      }

      // Process the data to group projects by sponsor
      const result = {};

      projectsData.rows.forEach((row) => {
        const sponsor_name = row.sponsor_name;
        if (!result[sponsor_name]) {
            result[sponsor_name] = {
                sponsor_id: row.sponsor_id,
                sponsor_name: sponsor_name,
                projects: [],
            };
        }
        result[sponsor_name].projects.push({
            project_id: row.project_id,
            project_name: row.project,
            project_logo: row.project_logo,
        });
      });
  
      // Return the sponsor's name and project's name
      res.status(200).json(Object.values(result));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

const createProject = async (req, res) => {
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
          [username, email, hashedPassword, 'project']
      )

      const userId = userResult.rows[0].id;

      // Insert project data into the projects table
      await pool.query(
        'INSERT INTO projects (user_id, name, description)\
        VALUES ($1, $2, $3)',
        [userId, name, description]
    );

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


// Update project
const updateProject = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, username, email, logo } = req.body;
  
    try {
      const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
      if (!rows.length) {
        return res.status(404).json({ message: 'project not found' });
      }
  
      const queryText = 'UPDATE projects SET name = $1, description = $2, username = $3, email = $4, logo = $5, updated_at = $6 WHERE id = $7';
      const values = [name, description, username, email, logo, new Date(), id];
  
      await pool.query(queryText, values);
      return res.status(200).json({ message: 'project updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};

const deleteProject = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query('DELETE FROM projects WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'project not found' });
        }
        res.status(200).send(`project deleted with ID: ${id}`)
    })
};

module.exports = {
    getAllProjects,
    getProjectById,
    getProjectByUserId,
    getProjectsBySponsorId,
    createProject,
    updateProject,
    deleteProject,
};
