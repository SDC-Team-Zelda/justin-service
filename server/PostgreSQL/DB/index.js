const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '18.191.183.167',
  database: 'airbnb',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected');
  }
});

module.exports = pool;