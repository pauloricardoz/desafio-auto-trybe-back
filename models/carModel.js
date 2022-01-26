const connection = require('./connection');

const dbName = 'carModel';
const dbCollection = 'cars';

const getAll = async () => connection.getConnection(dbName)
  .then((db) => db.collection(dbCollection).find())
  .then((result) => result.toArray())
  .then((result) => result.map((car) => { 
    const { _id: id, ...restCar } = car;
    return { id, ...restCar };
  }));

const insertCar = async (car) => 
  connection.getConnection(dbName)
    .then((db) => db.collection(dbCollection).insertOne({ ...car }));

const editCar = async (car) => {
  const { id } = car;
  return connection.getConnection(dbName)
    .then((db) => db.collection(dbCollection).updateOne({ _id: id }, { $set: { ...car } }));
};
const deleteCar = async (id) => connection.getConnection(dbName)
  .then((db) => db.collection(dbCollection).deleteOne({ _id: id }));

const getByProperties = async (properties) => connection.getConnection(dbName)
.then((db) => db.collection(dbCollection).find(properties))
.then(async (result) => result.toArray())
.then((result) => result.map((car) => { 
  const { _id: id, ...restCar } = car;
  return { id, ...restCar };
}));
  
module.exports = { getAll, insertCar, editCar, deleteCar, getByProperties };