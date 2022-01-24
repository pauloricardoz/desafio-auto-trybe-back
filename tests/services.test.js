const { expect } = require('chai');
const sinon = require('sinon');

const carService = require('../services/carService');
const carModel = require('../models/carModel');

const connection = require('../models/connection');
const connectionStubed = require('./utils/connectionMemory');

const testData = require('./utils/testData');

const dbName = 'carModel';
const dbCollection = 'cars';

async function deleteAllData(myDbName, myDbCollection) {
  await connection.getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).deleteMany({}));
}

async function insertOneData(myDbName, myDbCollection) {
  await connection.getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).insertOne(testData.newCar));
}

describe('Car services', function () {
  before(async function () {
    sinon.stub(connection, 'getConnection').resolves(connectionStubed.getConnection());
    sinon.stub(carModel, 'getAll').resolves([]);
  });

  after(async function () {
    sinon.reset();
  });

  it('Basic CRUD function for services', async function () {
    expect(carService).to.be.an('object');
    Object.values(carService)
      .forEach((serviceFunc) => expect(serviceFunc).to.be.an('function'));
    expect(carService).to.have.keys([
      'getAll', 'insertCar', 'editCar', 'deleteCar', 'getByProperties',
    ]);
  });
  describe('GetFunctions', function () {
    it('GetAll working correctly', async function () {
      await deleteAllData(dbName, dbCollection);
      const allCars = await carService.getAll();
      expect(allCars).to.be.an('array');
      expect(allCars).to.be.eql([]);
    });
    it('GetByProperties working correctly', async function () {
      const carsByProperties = await carService.getByProperties({ type: 'carro' });
      expect(carsByProperties).to.be.an('array');
      expect(carsByProperties).to.be.eql([]);
    });
    it('GetByProperties without parameters', async function () {
      const carsByPropertiesError = await carService.getByProperties({});
      expect(carsByPropertiesError).to.be.an('object');
      expect(carsByPropertiesError).to.have.keys(['isError']);
      expect(carsByPropertiesError.isError).to.be.eq(true);
    });
    it('GetByProperties with not allowed parameter', async function () {
      const carsByPropertiesError = await carService.getByProperties({ color: 'vermelho' });
      expect(carsByPropertiesError).to.be.an('object');
      expect(carsByPropertiesError).to.have.keys(['isError']);
      expect(carsByPropertiesError.isError).to.be.eq(true);
    });
    function wrongTypes(nameProperty, value) {
      return async function () {
        const carsByPropertiesError = await carService.getByProperties({ [nameProperty]: value });
        expect(carsByPropertiesError).to.be.an('object');
        expect(carsByPropertiesError).to.have.keys(['isError']);
        expect(carsByPropertiesError.isError).to.be.eq(true);
      };
    }
    describe('GetByProperties check parameters', function () {
      it('Type wrong data type', wrongTypes('type', 1));
      it('Type rigth data type, but empty string', wrongTypes('type', ''));
      it('brand wrong data type', wrongTypes('brand', 1));
      it('Model wrong data type', wrongTypes('model', 1));
      it('Version wrong data type', wrongTypes('version', 1));
      it('Year wrong data type', wrongTypes('year', '1988'));
      it('mileage wrong data type', wrongTypes('mileage', '10'));
      it('transmissionType wrong data type', wrongTypes('transmissionType', 2));
      it('sellPrice wrong data type', wrongTypes('sellPrice', '10000'));
      it('dateReference wrong data type', wrongTypes('dateReference', new Date()));
    });
  });
});