const pool = require('../models/pool')


// Get all sponsors
const getAllSponsors = (req, res) => {
    pool.query('SELECT * FROM sponsors', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
};

// Get sponsor by project id
const getSponsorsByProjectId = async (req, res) => {
    const projectId = req.params.projectId;
  
    try {
      // Query the database to get the sponsor associated with the project
      const sponsorsData = await pool.query(
        'SELECT DISTINCT\
        projects.id AS project_id,\
        projects.name AS project_name,\
        projects.description AS project_description,\
        projects.logo AS project_logo,\
        sponsors.id AS sponsor_id,\
        sponsors.name AS sponsor_name,\
        sponsors.logo AS sponsor_logo\
        FROM projects\
        INNER JOIN sponsor_projects ON projects.id = sponsor_projects.project_id\
        INNER JOIN sponsors ON sponsors.id = sponsor_projects.sponsor_id\
        WHERE projects.id = $1;',
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
            project_description: row.project_description,
            project_logo: row.project_logo,
            sponsors: [],
          };
        }
        result[project_name].sponsors.push({
          sponsor_id: row.sponsor_id,
          sponsor_name: row.sponsor_name,
          sponsor_logo: row.sponsor_logo,
        });
      });
  
      // Return the sponsor's name and logo
      res.status(200).json(Object.values(result));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

// Create sponsor
const createSponsor = (req, res) => {
    const { name, description, username, email, logo } = req.body;

    pool.query(
        'INSERT INTO sponsors (name, description, username, email, logo) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [name, description, username, email, logo],
        (error, results) => {
            if (error) {
                console.error('Error creating sponsor:', error);
                res.status(500).json({ error: 'Error creating sponsor' });
                return;
            }
            res.status(201).json({ message: `Sponsor added with ID: ${results.rows[0].id}` });
        }
    );
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
    getSponsorsByProjectId,
    createSponsor,
    updateSponsor,
    deleteSponsor
};
