const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'justincalvo',
  host: 'localhost',
  database: 'airbnb',
  port: 5432,
});

module.exports = pool;