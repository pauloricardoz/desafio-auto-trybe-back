const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

// const server = require('../api/server');
const server = require('../app');

const { expect } = chai;
chai.use(chaiHttp);

describe('Verifica a rota GET "/"', function () {
  let response;
  before(async function () {
    response = await chai.request(server).get('/').send();
  });

  it('retorna o status 200', function () {
    expect(response).to.have.status(200);
  });
});