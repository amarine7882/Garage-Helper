const express = require('express');

const controller = require('./controllers');

const router = express.Router();

// <----------- Car endpoints ---------------->

router.get('/users/:userID/cars/:carID', controller.cars.get);

router.post('/users/:userID/cars', express.json(), controller.cars.post);

router.get('/users/:userID/cars', controller.cars.getList);

// <----------------- Service Item endpoints ---------->

router.get('/users/:userID/cars/:carID/serviceItems', controller.serviceItems.get);

router.post(
  '/users/:userID/cars/:carID/serviceItems',
  express.json(),
  controller.serviceItems.post
);

router.patch(
  '/users/:userID/cars/:carID/serviceItems',
  express.json(),
  controller.serviceItems.patch
);

module.exports = router;
