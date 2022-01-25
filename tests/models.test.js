const { expect } = require('chai');
const sinon = require('sinon');
const carModel = require('../models/carModel');
const connection = require('../models/connection');
const connectionStubed = require('./utils/connectionMemory');

const dbName = 'carModel';
const dbCollection = 'cars';

async function deleteAllData(myDbName, myDbCollection) {
  await connection.getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).deleteMany({}));
}

describe('Car model tests', function () {
  before(async function () {
    sinon.stub(connection, 'getConnection').resolves(connectionStubed.getConnection());
  });

  after(async function () {
    sinon.restore();
  });

  describe('Checking basic function', function () {
    it('Basic CRUD functions for car model', async function () {
      expect(carModel).to.be.an('object');
      expect(carModel).to.have.all.keys([
        'getAll', 'insertCar', 'editCar', 'deleteCar', 'getByProperties',
      ]);
      Object.values(carModel)
        .forEach((basicFunc) => expect(basicFunc).to.be.an('function'));
    });

    it('GetFunctions', async function () {
      const allCars = await carModel.getAll();
      expect(allCars).to.be.an('array');
      const carsByProperties = await carModel.getByProperties();
      expect(carsByProperties).to.be.an('array');  
    });

    it('InsertFunction', async function () {
      await deleteAllData(dbName, dbCollection);
      
      let allCars = await carModel.getAll();
      expect(allCars).to.be.length(0);
      const newCar = {
        Type: 'carro',
        brand: 'fiat',
        Model: 'palio',
        Version: '1.0',
        Year: 2012,
        mileage: 10,
        transmissionType: 'manual',
        sellPrice: 20000,
        dateReference: new Date(),
      };
      const car = await carModel.insertCar(newCar);
      expect(car).to.be.an('object');
      expect(car.acknowledged).to.be.eq(true);
      allCars = await carModel.getAll();
      expect(allCars).to.be.length(1);
      const { _id: id } = allCars[0];
      expect(id).to.be.eql(car.insertedId);
    });

    it('EditFunction', async function () {
      await deleteAllData(dbName, dbCollection);

      let allCars = await carModel.getAll();
      expect(allCars).to.be.length(0);
      const newCar = {
        Type: 'carro',
        brand: 'fiat',
        Model: 'palio',
        Version: '1.0',
        Year: 2012,
        mileage: 10,
        transmissionType: 'manual',
        sellPrice: 20000,
        dateReference: new Date(),
      };
      const car = await carModel.insertCar(newCar);
      expect(car).to.be.an('object');
      expect(car.acknowledged).to.be.eq(true);
      allCars = await carModel.getAll();
      expect(allCars).to.be.length(1);
      const { _id: id } = allCars[0];
      expect(id).to.be.eql(car.insertedId);

      const editedCar = await carModel.editCar({ 
        id, ...newCar, Version: '1.3', 
      });
      expect(editedCar).to.be.an('object');
      expect(editedCar.acknowledged).to.be.eq(true);
      expect(editedCar.modifiedCount).to.be.eq(1);
      expect(editedCar.upsertedCount).to.be.eq(0);
    });
    it('DeleteFunction', async function () {
      await deleteAllData(dbName, dbCollection);

      let allCars = await carModel.getAll();
      expect(allCars).to.be.length(0);
      const newCar = {
        Type: 'carro',
        brand: 'fiat',
        Model: 'palio',
        Version: '1.0',
        Year: 2012,
        mileage: 10,
        transmissionType: 'manual',
        sellPrice: 20000,
        dateReference: new Date(),
      };
      const car = await carModel.insertCar(newCar);
      expect(car).to.be.an('object');
      expect(car.acknowledged).to.be.eq(true);
      allCars = await carModel.getAll();
      expect(allCars).to.be.length(1);
      const { _id: id } = allCars[0];
      expect(id).to.be.eql(car.insertedId);

      const deletedCar = await carModel.deleteCar(id);
      expect(deletedCar).to.be.an('object');
      expect(deletedCar.acknowledged).to.be.eq(true);
      expect(deletedCar.deletedCount).to.be.eq(1);
    });
  });

  it('Example', async function () {
    await connection.getConnection('test')
      .then((e) => e.collection('colec1').insertOne({ name: 'Zambs' }));
    await connection.getConnection('test')
      .then((e) => e.collection('colec1').insertOne({ name: 'Zambs' }));
    const data = await connection.getConnection('test')
      .then((e) => e.collection('colec1').find())
      .then((e) => e.toArray());
  });
});