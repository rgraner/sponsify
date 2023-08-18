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

module.exports = getAllSponsors;