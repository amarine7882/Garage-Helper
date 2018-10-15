const express = require('express');

const controller = require('./controllers');

const router = express.Router();

router.get('/cars/:carID', controller.cars.get);

router.post('/cars', express.json(), controller.cars.post);

router.get('/users/:userID/cars', controller.users.get);

module.exports = router;
