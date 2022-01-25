const carModel = require('../models/carModel');

const getAll = async () => carModel.getAll();
 
const insertCar = async () => null;
 
const editCar = async () => null;
 
const deleteCar = async () => null;

const getByProperties = async (car) => {
  if (isInvalidVehicleProperties(car)) {
    return { isError: true };
  }
  return carModel.getByProperties(car);
};

module.exports = { getAll, insertCar, editCar, deleteCar, getByProperties };
