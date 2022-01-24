const connection = require('./connection');

const dbName = 'carModel';
const dbCollection = 'cars';

const getAll = async () => connection.getConnection(dbName)
  .then((db) => db.collection(dbCollection).find())
  .then((result) => result.toArray());

const insertCar = async (car) => 
  connection.getConnection(dbName)
    .then((db) => db.collection(dbCollection).insertOne(car));

const editCar = async (car) => {
  const { _id: id } = car;
  return connection.getConnection(dbName)
    .then((db) => db.collection(dbCollection).updateOne({ _id: id }, { $set: car }));
};
const deleteCar = async (id) => connection.getConnection(dbName)
  .then((db) => db.collection(dbCollection).deleteOne({ _id: id }));
const getByProperties = async (properties) => connection.getConnection(dbName)
.then((db) => db.collection(dbCollection).find(properties))
.then((result) => result.toArray());
  
module.exports = { getAll, insertCar, editCar, deleteCar, getByProperties };