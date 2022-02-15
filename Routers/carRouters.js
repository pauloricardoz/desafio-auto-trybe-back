const { Router } = require('express');
const { 
  getAll,
    getByProperties,
    insertCar,
    editCar,
    deleteCar,
  } = require('../controllers/carController');

const carRouter = Router();

carRouter.get('/', getAll);
carRouter.post('/properties', getByProperties);
carRouter.post('/', insertCar);
carRouter.put('/', editCar);
carRouter.delete('/', deleteCar);

module.exports = carRouter;
