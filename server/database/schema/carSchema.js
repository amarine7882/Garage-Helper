const { Schema } = require('mongoose');

const { Mixed } = Schema.Types;

const carSchema = new Schema({
  userID: String,
  carName: String,
  make: String,
  model: String,
  modelYear: Number,
  serviceItems: [{ serviceName: String, serviceInterval: Mixed }]
});

module.exports = carSchema;
