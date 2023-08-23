const pool = require('../models/pool')


// Get all projects
const getAllProjects = (req, res) => {
    pool.query('SELECT * FROM projects', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
};

// Create project
const createProject = (req, res) => {
    const { name, description, username, email, logo } = req.body;

    pool.query(
        'INSERT INTO projects (name, description, username, email, logo) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [name, description, username, email, logo],
        (error, results) => {
            if (error) {
                console.error('Error creating project:', error);
                res.status(500).json({ error: 'Error creating project' });
                return;
            }
            res.status(201).json({ message: `project added with ID: ${results.rows[0].id}` });
        }
    );
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
    createProject,
    updateProject,
    deleteProject,
};
