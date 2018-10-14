const express = require('express');

const controller = require('./controllers');

const router = express.Router();

router.get('/cars/:carID', controller.cars.get);

router.post('/cars', express.json(), controller.cars.post);

module.exports = router;
