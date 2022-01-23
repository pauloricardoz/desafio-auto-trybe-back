const { expect } = require('chai');
const carModel = require('../models/carModel');
const connection = require('../models/connection');

describe('car model', function () {
  it('exist car model', async function () {
    expect(carModel).to.be.an('object');
    expect(carModel).to.have.all.keys(['getAll'])
    // const data = await connection('test');
    // data.collection('colec1').insertOne({ name: 'Zambs' });
  });
});