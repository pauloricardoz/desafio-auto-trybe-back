const { expect } = require('chai');
const carModel = require('../models/carModel');

describe('car model', function () {
  it('exist car model', function () {
    expect(carModel).to.be('function');
  });
});