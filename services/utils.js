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

const isNotAnObject = (car) => !(car instanceof Object);

const isAnEmptyObject = (car) => !(Object.keys(car).length);

const isPropertiesNotRightType = (car) => !Object.keys(car)
  .every((property) => typeof car[property] === isRightTypes[property]);

const isStringEmpty = (car) => Object.entries(car)
    .filter(([key]) => Object.keys(isRightTypes).includes(key) && isRightTypes[key] === 'string')
    .some(([_key, value]) => value.length === 0);

const isInvalidVehicleProperties = (car) => {
  if (isNotAnObject(car)) { return true; }
  if (isAnEmptyObject(car)) { return true; }
  if (isPropertiesNotRightType(car)) { return true; }
  if (isStringEmpty(car)) { return true; }
  return false;
};

const haveAllProperties = (car) => Object.keys(isRightTypes).every((property) => car[property]);

module.exports = { isInvalidVehicleProperties, haveAllProperties };