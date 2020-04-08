require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const pool = require('./PostgreSQL/DB/index.js');
const port = 3003;

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/api/rental', (req, res) => {
  const id = req.query.id;
  pool.query(`SELECT * FROM rental WHERE id=${id}`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(results.rows);
  });
});

// app.get('/app.js', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '.../public/bundle.js'));
// });

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});