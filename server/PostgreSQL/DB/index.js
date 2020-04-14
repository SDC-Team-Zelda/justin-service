const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'power_user',
  password: 'justin',
  host: 'localhost',
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