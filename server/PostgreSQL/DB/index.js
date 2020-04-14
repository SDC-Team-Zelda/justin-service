const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '3.15.213.114',
  database: 'airbnb',
  port: 5432,
});

module.exports = pool;