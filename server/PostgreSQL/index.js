const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 3003;

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'justincalvo',
  host: 'localhost',
  database: 'airbnb',
  port: 5432,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({
    info: 'connected'
  });
});

app.get('/api/rental', (req, res) => {
  const id = req.query.id;
  pool.query(`SELECT * FROM rental WHERE id=${id}`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(results.rows);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});