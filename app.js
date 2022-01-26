const express = require('express');

const carRouter = require('./Routers/carRouters');

const app = express();

app.use(express.json());

app.use('/cars', carRouter);

module.exports = app;