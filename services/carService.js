const { ObjectId } = require('mongodb');
const carModel = require('../models/carModel');
const { isInvalidVehicleProperties, haveAllProperties } = require('./utils');

const getAll = async () => carModel.getAll();

const insertCar = async (car) => {
  const isInvalidVehiclePropertiesState = isInvalidVehicleProperties(car);
  if (isInvalidVehiclePropertiesState) {
    return { isError: true, ...isInvalidVehiclePropertiesState };
  }
  if (!haveAllProperties(car)) return { isError: true, message: 'Não tem todas as propriedades' };
  const insertedCar = await carModel.insertCar({ ...car });
  return { ...car, id: insertedCar.insertedId };
};

const editCar = async (car) => {
  const allPropertiesValid = isInvalidVehicleProperties(car);
  if (allPropertiesValid) {
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
  const allPropertiesValid = isInvalidVehicleProperties(car);
  if (allPropertiesValid) {
    return { isError: true };
  }
  return carModel.getByProperties(car);
};

module.exports = { getAll, insertCar, editCar, deleteCar, getByProperties };
