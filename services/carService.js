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

const editCar = async () => null;

const deleteCar = async () => null;

const getByProperties = async (car) => {
  if (isInvalidVehicleProperties(car)) {
    return { isError: true };
  }
  return carModel.getByProperties(car);
};

module.exports = { getAll, insertCar, editCar, deleteCar, getByProperties };
