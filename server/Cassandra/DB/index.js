var cassandra = require('cassandra-driver');

var db = {
  localDataCenter: 'datacenter1',
  contactPoints: ['localhost'],
  keyspace: 'airbnb'
};

var connection = new cassandra.Client(db);

connection.connect(function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log('cassandra connected');
  }
});

module.exports = connection;