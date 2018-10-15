const { Schema } = require('mongoose');

const carSchema = new Schema({
  userID: String,
  carName: String,
  make: String,
  model: String,
  modelYear: Number,
  serviceItems: [
    {
      serviceName: String,
      serviceInterval: Number,
      startDate: { type: Date, default: Date.now() }
    }
  ]
});

module.exports = carSchema;
