const { Schema } = require('mongoose');

const carSchema = new Schema({
  userID: String,
  carID: Number,
  name: String,
  make: String,
  model: String,
  modelYear: Number
});

module.exports = carSchema;
