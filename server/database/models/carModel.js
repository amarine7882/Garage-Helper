const mongoose = require('mongoose');
const carSchema = require('../schema/carSchema.js');

const Car = mongoose.model('Car', carSchema);

exports = Car;
