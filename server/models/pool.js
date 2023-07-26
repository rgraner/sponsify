const { Pool } = require('pg');

const pool = new Pool({
  user: 'your-db-username',
  host: 'your-db-host',
  database: 'your-db-name',
  password: 'your-db-password',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
