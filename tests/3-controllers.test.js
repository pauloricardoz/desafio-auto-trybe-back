const sinon = require('sinon');
const { expect } = require('chai');

const { ObjectId } = require('mongodb');
const carController = require('../controllers/carController');
const carService = require('../services/carService');
const { newCar, editedCar } = require('./utils/testData');
const { getConnection, closeConnection } = require('./utils/connectionMemory');

const dbName = 'carModel';
const dbCollection = 'cars';

async function deleteAllData(myDbName, myDbCollection) {
  await getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).deleteMany({}));
}

describe('Car controller', function () {
  after(async function () {
    await deleteAllData(dbName, dbCollection);
  });

  after(async function () {
    sinon.restore();
    closeConnection();
  });
  describe('geral', function () {
    const response = {};
    function basicInit() {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    }
    beforeEach(basicInit);
    it('Basic structure', async function () {
      expect(carController).to.be.an('object');
      expect(carController).to.have.keys([
        'getAll', 'insertCar', 'editCar', 'deleteCar', 'getByProperties',
      ]);
      Object.values(carController)
      .forEach((controllerFunction) => expect(controllerFunction).to.be.an('function'));
    });
  });
  describe('GetFunctions', function () {
    describe('GetAll working correctly', function () {
      const response = {};
      const request = {};
      let id;
      
      before(function basicInit() {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        id = ObjectId.generate();
        carService.getAll = sinon.stub().returns([{ ...newCar, id }]);
      });
      
      it('GetAll working correctly', async function () {
        const cars = await carController.getAll(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith([{ ...newCar, id }])).to.be.equal(true);
      });
    });
    describe('GetByProperty working correctly', function () {
      const response = {};
      const request = {};
      let returnService;
      let id;
      beforeEach(function basicInit() {
        request.query = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        id = ObjectId.generate();
        returnService = [{ ...newCar, id }];
        carService.getByProperties = sinon.stub().returns(returnService);
      });
      afterEach(async function () {
        sinon.restore();
      });
      it('Type', async function () {
        request.query = { type: 'carro' };

        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({ ...request.query })).to.be.equal(true);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(returnService)).to.be.equal(true);
      });
      it('brand', async function () {
        request.query = { brand: 'fiat' };
        console.log(request);
        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({ ...request.query })).to.be.equal(true);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(returnService)).to.be.equal(true);
      });
      it('model', async function () {
        request.query = { model: 'palio' };

        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({ ...request.query })).to.be.equal(true);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(returnService)).to.be.equal(true);
      });
      it('version', async function () {
        request.query = { version: '1.0' };

        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({ ...request.query })).to.be.equal(true);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(returnService)).to.be.equal(true);
      });
      it('year', async function () {
        request.query = { year: 1988 };

        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({ ...request.query })).to.be.equal(true);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(returnService)).to.be.equal(true);
      });
      it('mileage', async function () {
        request.query = { mileage: 10 };

        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({ ...request.query })).to.be.equal(true);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(returnService)).to.be.equal(true);
      });
      it('transmissionType', async function () {
        request.query = { transmissionType: 'automático' };

        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({ ...request.query })).to.be.equal(true);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(returnService)).to.be.equal(true);
      });
      it('sellPrice', async function () {
        request.query = { sellPrice: 10000 };

        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({ ...request.query })).to.be.equal(true);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(returnService)).to.be.equal(true);
      });
      it('dateReference', async function () {
        request.query = { dateReference: '12-2012' };

        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({ ...request.query })).to.be.equal(true);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(returnService)).to.be.equal(true);
      });
    });

    it('GetByProperties without parameter ', async function () {
        const response = { };
        const request = { query: {} };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        const returnService = { isError: true };
        carService.getByProperties = sinon.stub().returns(returnService);
        
        await carController.getByProperties(request, response);

        expect(carService.getByProperties.calledWith({})).to.be.equal(true);
        expect(response.status.calledWith(422)).to.be.equal(true);
        expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
    it('GetByProperties with not allowed parameter', async function () {
      const response = { };
      const request = { query: { color: 'vermelho' } };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      const returnService = { isError: true };
      carService.getByProperties = sinon.stub().returns(returnService);

      await carController.getByProperties(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
  });
  describe('InsertFunction', function () {
    describe('Sucess insertion', function () {
      const response = {};
      const request = {};
      let id;
      
      before(function basicInit() {
        id = ObjectId.generate();
        request.body = { ...newCar, id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        carService.insertCar = sinon.stub().returns({ ...newCar, id });
      });
      
      it('InsertCar working correctly', async function () {
        await carController.insertCar(request, response);

        expect(carService.insertCar.calledWith({ ...request.body }));
        expect(response.status.calledWith(201)).to.be.equal(true);
        expect(response.json.calledWith({ ...newCar, id })).to.be.equal(true);
      });
    });

    it('InsertionCar without parameter ', async function () {
        const response = { };
        const request = { body: {} };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        const returnService = { isError: true };
        carService.insertCar = sinon.stub().returns(returnService);
        
        await carController.insertCar(request, response);

        expect(carService.insertCar.calledWith({})).to.be.equal(true);
        expect(response.status.calledWith(422)).to.be.equal(true);
        expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
    it('InsertionCar with not allowed parameter', async function () {
      const response = { };
      const request = { body: { color: 'vermelho' } };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      const returnService = { isError: true };
      carService.insertCar = sinon.stub().returns(returnService);

      await carController.insertCar(request, response);

      expect(carService.insertCar.calledWith({ color: 'vermelho' })).to.be.equal(true);
      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
  });
  describe('EditFunction', function () {
    describe('Sucess insertion', function () {
      const response = {};
      const request = {};
      let id;
      
      before(function basicInit() {
        id = ObjectId.generate();
        request.body = { ...editedCar, id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        carService.editCar = sinon.stub().returns({ ...editedCar, id });
      });
      
      it('EditCar working correctly', async function () {
        await carController.editCar(request, response);

        expect(carService.editCar.calledWith({ ...request.body }));
        expect(response.status.calledWith(204)).to.be.equal(true);
        expect(response.json.calledWith({ ...editedCar, id })).to.be.equal(true);
      });
    });

    it('EditCar without parameter ', async function () {
        const response = { };
        const request = { body: {} };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        const returnService = { isError: true };
        carService.editCar = sinon.stub().returns(returnService);
        
        await carController.editCar(request, response);

        expect(carService.editCar.calledWith({})).to.be.equal(true);
        expect(response.status.calledWith(422)).to.be.equal(true);
        expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
    it('EditCar with not allowed parameter', async function () {
      const response = { };
      const request = { body: { color: 'vermelho' } };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      const returnService = { isError: true };
      carService.editCar = sinon.stub().returns(returnService);

      await carController.editCar(request, response);

      expect(carService.editCar.calledWith({ color: 'vermelho' })).to.be.equal(true);
      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
  });
  describe('DeleteFunction', function () {
    describe('Sucess deletion', function () {
      const response = {};
      const request = {};
      let id;
      
      before(function basicInit() {
        id = ObjectId.generate();
        request.body = { id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        carService.deleteCar = sinon.stub().returns({ message: `Carro com id ${id} deletado` });
      });
      
      it('DeleteCar working correctly', async function () {
        await carController.deleteCar(request, response);

        expect(carService.deleteCar.calledWith(id));
        expect(response.status.calledWith(202)).to.be.equal(true);
        expect(response.json.calledWith({ message: `Carro com id ${id} deletado` })).to.be.equal(true);
      });
    });

    it('DeleteCar without parameter ', async function () {
        const response = { };
        const request = { body: {} };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        const returnService = { isError: true };
        carService.deleteCar = sinon.stub().returns(returnService);
        
        await carController.deleteCar(request, response);

        expect(carService.deleteCar.calledWith(undefined)).to.be.equal(true);
        expect(response.status.calledWith(422)).to.be.equal(true);
        expect(response.json.calledWithMatch({ isError: true })).to.be.equal(true);
    });
  });
});