const mongo = require('mongodb');

let connection = null;

const dbUrl = 'mongodb://localhost:27017';

const getConnection = async (dbName) => {
  connection = connection || await new mongo.MongoClient(dbUrl).connect();
  return connection.db(dbName);
};

module.exports = { getConnection };