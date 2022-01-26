const { ObjectId } = require('mongodb');
const carModel = require('../models/carModel');
const { isInvalidVehicleProperties, haveAllProperties } = require('./utils');

const getAll = async () => carModel.getAll();

const insertCar = async (car) => {
  if (isInvalidVehicleProperties(car)) {
    return { isError: true };
  }
  if (!haveAllProperties(car)) return { isError: true };
  const insertedCar = await carModel.insertCar({ ...car });
  return { ...car, id: insertedCar.insertedId };
};

const editCar = async (car) => {
  if (isInvalidVehicleProperties(car)) {
    return { isError: true };
  }
  const editedCar = await carModel.editCar(car);
  return { ...car, id: editedCar.insertedId };
};

const deleteCar = async (id) => {
  if (!id || !ObjectId.isValid(id)) {
    return { isError: true };
  }
  const deletedCar = await carModel.deleteCar(id);
  if (!deletedCar.deletedCount) {
    return { isError: true };
  }
  return { message: `Carro com id ${id} deletado` };
};

const getByProperties = async (car) => {
  if (isInvalidVehicleProperties(car)) {
    return { isError: true };
  }
  return carModel.getByProperties(car);
};

module.exports = { getAll, insertCar, editCar, deleteCar, getByProperties };
