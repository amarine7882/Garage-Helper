const { Schema } = require('mongoose');

const carSchema = new Schema({
  userID: String,
  carName: String,
  make: String,
  model: String,
  modelYear: Number,
  mileage: Number,
  serviceItems: [
    {
      serviceName: String,
      serviceIntervalMonths: Number,
      serviceIntervalMiles: Number,
      lastCompleted: Date,
      nextDue: Date
    }
  ]
});

module.exports = carSchema;
