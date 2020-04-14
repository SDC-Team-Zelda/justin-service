const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cassandra = require('./DB/index.js');
const port = 3003;

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

app.get('/api/rentals', (req, res) => {
  const id = req.query.id;
  cassandra.execute(`SELECT * FROM rentals WHERE id=${id}`, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(results.rows);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});