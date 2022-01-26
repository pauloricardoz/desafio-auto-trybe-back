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
  .every((property) => (
    property !== 'id' ? typeof car[property] === isRightTypes[property] : true));

const isStringEmpty = (car) => Object.entries(car)
    .filter(([key]) => Object.keys(isRightTypes).includes(key) && isRightTypes[key] === 'string')
    .some(([_key, value]) => value.length === 0);

const isInvalidVehicleProperties = (car) => {
  if (isNotAnObject(car)) { return { message: 'Não é um objeto' }; }
  if (isAnEmptyObject(car)) { return { message: 'É um objeto vazio' }; }
  if (isPropertiesNotRightType(car)) { return { message: 'Propriedade não é do tipo correto' }; }
  if (isStringEmpty(car)) { return { message: 'String vazia' }; }
  return false;
};

const haveAllProperties = (car) => Object.keys(isRightTypes).every((property) => car[property]);

module.exports = { isInvalidVehicleProperties, haveAllProperties, isRightTypes };