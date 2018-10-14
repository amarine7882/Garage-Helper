const router = require('express').Router();
const controller = require('./controllers');

router.get('/cars/:carID', controller.cars.get);

router.post('/cars', controller.cars.post);

module.exports = router;
