const express = require('express');

const carRouter = require('./Routers/carRouters');

const app = express();

app.use(express.json());

app.use('/cars', carRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Auto-Trybe at port ${PORT}`));