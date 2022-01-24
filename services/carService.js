const carModel = require('../models/carModel');

const getAll = async () => carModel.getAll();
 
const insertCar = async () => null;
 
const editCar = async () => null;
 
const deleteCar = async () => null;

const isRightTypes = {
  type: 'string',
  brand: 'string',
  model: 'string',
  version: 'string',
  year: 'number',
  mileage: 'number',
  transmissionType: 'string',
  sellPrice: 'number',
  dateReference: 'string',
};

const isValidVehicleProperties = (car) => !(car instanceof Object)
  || !Object.keys(car).length
  || !Object.keys(car)
    .every((property) => typeof car[property] === isRightTypes[property])
  || !Object.keys(car)
    .every((property) => isRightTypes[property] === 'string' && car[property].length);

const getByProperties = async (car) => {
  if (isValidVehicleProperties(car)
  ) return { isError: true };
  return carModel.getByProperties(car);
};

module.exports = { getAll, insertCar, editCar, deleteCar, getByProperties };