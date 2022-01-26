const { expect } = require('chai');
const sinon = require('sinon');

const carService = require('../services/carService');
const carModel = require('../models/carModel');

const connection = require('../models/connection');
const connectionStubed = require('./utils/connectionMemory');

const testData = require('./utils/testData');
const { ObjectId } = require('mongodb');

const dbName = 'carModel';
const dbCollection = 'cars';

const describeTest = {
  TypeWrongDataType: 'Type wrong data type', 
  TypeRigthDataTypeButEmptyString: 'Type rigth data type, but empty string', 
  brandWrongDataType: 'brand wrong data type', 
  ModelWrongDataType: 'Model wrong data type', 
  VersionWrongDataType: 'Version wrong data type', 
  YearWrongDataType: 'Year wrong data type', 
  mileageWrongDataType: 'mileage wrong data type',
  transmissionTypeWrongDataType: 'transmissionType wrong data type', 
  sellPriceWrongDataType: 'sellPrice wrong data type', 
  dateReferenceWrongDataType: 'dateReference wrong data type', 
};

async function deleteAllData(myDbName, myDbCollection) {
  await connection.getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).deleteMany({}));
}

async function insertOneData(myDbName, myDbCollection) {
  return connection.getConnection(myDbName)
        .then((db) => db.collection(myDbCollection).insertOne({ ...testData.newCar }));
}

describe('Car services', function () {
  before(async function () {
    sinon.stub(connection, 'getConnection').resolves(connectionStubed.getConnection());
    sinon.stub(carModel, 'getAll').resolves([]);
  });
  beforeEach(async function () {
    await deleteAllData(dbName, dbCollection);
  });

  after(async function () {
    sinon.restore();
    connectionStubed.closeConnection();
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
    describe('GetByProperties working correctly', function () {
      it('Type', async function () {
        const carsByProperties = await carService.getByProperties({ type: 'carro' });
        expect(carsByProperties).to.be.an('array');
        expect(carsByProperties).to.be.eql([]);
      });
      it('brand', async function () {
        const carsByProperties = await carService.getByProperties({ brand: 'fiat' });
        expect(carsByProperties).to.be.an('array');
        expect(carsByProperties).to.be.eql([]);
      });
      it('model', async function () {
        const carsByProperties = await carService.getByProperties({ model: 'palio' });
        expect(carsByProperties).to.be.an('array');
        expect(carsByProperties).to.be.eql([]);
      });
      it('version', async function () {
        const carsByProperties = await carService.getByProperties({ version: '1.0' });
        expect(carsByProperties).to.be.an('array');
        expect(carsByProperties).to.be.eql([]);
      });
      it('year', async function () {
        const carsByProperties = await carService.getByProperties({ year: 1988 });
        expect(carsByProperties).to.be.an('array');
        expect(carsByProperties).to.be.eql([]);
      });
      it('mileage', async function () {
        const carsByProperties = await carService.getByProperties({ mileage: 10 });
        expect(carsByProperties).to.be.an('array');
        expect(carsByProperties).to.be.eql([]);
      });
      it('transmissionType', async function () {
        const carsByProperties = await carService
          .getByProperties({ transmissionType: 'automático' });
        expect(carsByProperties).to.be.an('array');
        expect(carsByProperties).to.be.eql([]); 
      });
      it('sellPrice', async function () {
        const carsByProperties = await carService.getByProperties({ sellPrice: 10000 });
        expect(carsByProperties).to.be.an('array');
        expect(carsByProperties).to.be.eql([]);
      });
      it('dateReference', async function () {
        const carsByProperties = await carService.getByProperties({ dateReference: '12-2012' });
        expect(carsByProperties).to.be.an('array');
        expect(carsByProperties).to.be.eql([]);
      });
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
    function wrongTypes(nameProperty, value, serviceFunc) {
      return async function () {
        const carsByPropertiesError = await carService[serviceFunc]({ [nameProperty]: value });

        expect(carsByPropertiesError).to.be.an('object');
        expect(carsByPropertiesError).to.have.keys(['isError']);
        expect(carsByPropertiesError.isError).to.be.eq(true);
      };
    }
    describe('GetByProperties check parameters', function () {
      it(describeTest.TypeWrongDataType, wrongTypes('type', 1, 'getByProperties'));
      it(describeTest.TypeRigthDataTypeButEmptyString, wrongTypes('type', '', 'getByProperties'));
      it(describeTest.brandWrongDataType, wrongTypes('brand', 1, 'getByProperties'));
      it(describeTest.ModelWrongDataType, wrongTypes('model', 1, 'getByProperties'));
      it(describeTest.VersionWrongDataType, wrongTypes('version', 1, 'getByProperties'));
      it(describeTest.YearWrongDataType, wrongTypes('year', '1988', 'getByProperties'));
      it(describeTest.mileageWrongDataType, wrongTypes('mileage', '10', 'getByProperties'));
      it(describeTest.transmissionTypeWrongDataType,
        wrongTypes('transmissionType', 2, 'getByProperties'));
      it(describeTest.sellPriceWrongDataType, wrongTypes('sellPrice', '10000', 'getByProperties'));
      it(describeTest.dateReferenceWrongDataType,
        wrongTypes('dateReference', new Date(), 'getByProperties'));
    });
  });

  describe('InsertFunction', function () {
    it('Sucess insertion', async function () {
      await deleteAllData(dbName, dbCollection);

      const insertedCar = await carService.insertCar({ ...testData.newCar }, true);
      expect(insertedCar).to.be.an('object');
      expect(insertedCar).to.have.keys(['id', ...Object.keys({ ...testData.newCar })]);
    });
    function wrongTypesForInsertion(nameProperty, value) {
      return async function () {
        await deleteAllData(dbName, dbCollection);

        const carsByPropertiesError = await carService.insertCar({ [nameProperty]: value });

        expect(carsByPropertiesError).to.be.an('object');
        expect(carsByPropertiesError).to.have.keys(['isError']);
        expect(carsByPropertiesError.isError).to.be.eq(true);
      };
    }
    describe('Insertion check parameters', function () {
      it(describeTest.TypeWrongDataType, wrongTypesForInsertion('type', 1));
      it(describeTest.TypeRigthDataTypeButEmptyString, wrongTypesForInsertion('type', ''));
      it(describeTest.brandWrongDataType, wrongTypesForInsertion('brand', 1));
      it(describeTest.ModelWrongDataType, wrongTypesForInsertion('model', 1));
      it(describeTest.VersionWrongDataType, wrongTypesForInsertion('version', 1));
      it(describeTest.YearWrongDataType, wrongTypesForInsertion('year', '1988'));
      it(describeTest.mileageWrongDataType, wrongTypesForInsertion('mileage', '10'));
      it(describeTest.transmissionTypeWrongDataType, wrongTypesForInsertion('transmissionType', 2));
      it(describeTest.sellPriceWrongDataType, wrongTypesForInsertion('sellPrice', '10000'));
      it(describeTest.dateReferenceWrongDataType,
        wrongTypesForInsertion('dateReference', new Date()));
      it('Missing properties', async function () {
        await deleteAllData(dbName, dbCollection);

        const missingPropertyCar = { ...testData.newCar };
        delete missingPropertyCar.brand;

        const carsByPropertiesError1 = await carService.insertCar(missingPropertyCar, true);

        expect(carsByPropertiesError1).to.be.an('object');
        expect(carsByPropertiesError1).to.have.keys(['isError']);
        expect(carsByPropertiesError1.isError).to.be.eq(true);
      });
    });
  });

  describe('EditFunction', function () {
    it('Sucess insertion', async function () {
      await deleteAllData(dbName, dbCollection);
      const addedCar = await insertOneData(dbName, dbCollection);
      const editedCar = await carService
        .editCar({ ...testData.editedCar, id: addedCar.insertedId });
      expect(editedCar).to.be.an('object');
      expect(editedCar).to.have.keys(['id', ...Object.keys({ ...testData.editedCar })]);
    });
    function wrongTypesForEdition(nameProperty, value) {
      return async function () {
        await deleteAllData(dbName, dbCollection);

        const carsByPropertiesError = await carService.editCar({ [nameProperty]: value });

        expect(carsByPropertiesError).to.be.an('object');
        expect(carsByPropertiesError).to.have.keys(['isError']);
        expect(carsByPropertiesError.isError).to.be.eq(true);
      };
    }
    describe('Edition check parameters', function () {
      it(describeTest.TypeWrongDataType, wrongTypesForEdition('type', 1));
      it(describeTest.TypeRigthDataTypeButEmptyString, wrongTypesForEdition('type', ''));
      it(describeTest.brandWrongDataType, wrongTypesForEdition('brand', 1));
      it(describeTest.ModelWrongDataType, wrongTypesForEdition('model', 1));
      it(describeTest.VersionWrongDataType, wrongTypesForEdition('version', 1));
      it(describeTest.YearWrongDataType, wrongTypesForEdition('year', '1988'));
      it(describeTest.mileageWrongDataType, wrongTypesForEdition('mileage', '10'));
      it(describeTest.transmissionTypeWrongDataType, wrongTypesForEdition('transmissionType', 2));
      it(describeTest.sellPriceWrongDataType, wrongTypesForEdition('sellPrice', '10000'));
      it(describeTest.dateReferenceWrongDataType,
        wrongTypesForEdition('dateReference', new Date()));
    });
  });

  describe('DeleteFunction', function () {
    it('Sucess deletion', async function () {
      await deleteAllData(dbName, dbCollection);
      const addedCar = await insertOneData(dbName, dbCollection);

      const editedCar = await carService.deleteCar(addedCar.insertedId);

      expect(editedCar).to.be.an('object');
      expect(editedCar).to.have.keys(['message']);
    });
    
    describe('delete check parameters', function () {
      it('Missing id', async function () {
        await deleteAllData(dbName, dbCollection);

        const editedCar = await carService.deleteCar();

        expect(editedCar).to.be.an('object');
        expect(editedCar).to.have.keys(['isError']);
      });
      it('wrong formart id', async function () {
        await deleteAllData(dbName, dbCollection);

        const editedCar = await carService.deleteCar('1');

        expect(editedCar).to.be.an('object');
        expect(editedCar).to.have.keys(['isError']);
      });

      it('Right id, but not exist in the bank', async function () {
        await deleteAllData(dbName, dbCollection);

        const editedCar = await carService.deleteCar(ObjectId.generate());

        expect(editedCar).to.be.an('object');
        expect(editedCar).to.have.keys(['isError']);
      });
    });
  });
});