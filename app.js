const express = require('express');

const carRouter = require('./Routers/carRouters');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res
.status(200)
.send('<h1>Bem-vindo ao Auto trybe</h1>'));

app.use('/cars', carRouter);

module.exports = app;