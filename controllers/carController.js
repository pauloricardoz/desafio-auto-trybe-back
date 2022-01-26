const carService = require('../services/carService');

const getAll = async (req, res) => {
  const cars = await carService.getAll();

  return res.status(200).json(cars);
};

const insertCar = async (req, res) => {
  const { body } = req;
  const car = await carService.insertCar(body);
  if (car.isError) return res.status(422).json(car);

  return res.status(201).json(car);
};

const editCar = async (req, res) => {
  const { body } = req;
  const car = await carService.editCar(body);
  if (car.isError) return res.status(422).json(car);

  return res.status(204).json(car);
};

const deleteCar = async (req, res) => {
  const { id } = req.body;
  const car = await carService.deleteCar(id);
  if (car.isError) return res.status(422).json(car);

  return res.status(202).json(car);
};

const getByProperties = async (req, res) => {
  const { query } = req;
  
  const cars = await carService.getByProperties(query);
  if (cars.isError) return res.status(422).json(cars);

  return res.status(200).json(cars);
};

module.exports = { getAll, insertCar, editCar, deleteCar, getByProperties };
