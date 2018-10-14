const mongoose = require('mongoose');

const carSchema = require('../schema/carSchema');

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
