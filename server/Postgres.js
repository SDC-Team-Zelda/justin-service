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
    extended: false,
  })
);

app.get('http://3.15.213.114/api/rental', (req, res) => {
  const id = req.query.id;
  pool.query(`SELECT * FROM rental WHERE id=${id}`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(results.rows);
  });
});

app.post('http://3.15.213.114/api/rental', (req, res) => {
  const { id, price, max_guests, numreviews, avgstars, cleaning_fee, service_fee, occupancy_fee, availability } = req.body
  pool.query(`INSERT INTO rental (id, price, max_guests, numreviews, avgstars, cleaning_fee, service_fee, occupancy_fee, availability) VALUES (${id}, ${price}, ${max_guests}, ${numreviews}, ${avgstars}, ${cleaning_fee}, ${service_fee}, ${occupancy_fee}, '${availability}')`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send(`Rental added with ID: ${results}`);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});