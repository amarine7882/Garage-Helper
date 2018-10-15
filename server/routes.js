const express = require('express');

const controller = require('./controllers');

const router = express.Router();

// <----------- Car endpoints ---------------->

router.get('/cars/:carID', controller.cars.get);

router.post('/cars', express.json(), controller.cars.post);

// < ---------------- User Endpoints ------------- >

router.get('/users/:userID/cars', controller.users.get);

// <----------------- Service Item endpoints ---------->

router.get('/cars/:carID/serviceItems', controller.serviceItems.get);

router.post('/cars/:carID/serviceItems', express.json(), controller.serviceItems.post);

module.exports = router;
