const mongo = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

let connection = null;
// const dbUrl = 'mongodb://localhost:27017';

const getConnection = async (dbName) => {
  const mongoServer = await MongoMemoryServer.create();
  mongoServer.start();
  const dbUrl = mongoServer.getUri();
  connection = connection || await new mongo.MongoClient(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).connect();
  return connection.db(dbName);
};

module.exports = { getConnection };