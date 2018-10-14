const { Schema } = require('mongoose');

const carSchema = new Schema({
  userID: String,
  carName: String,
  make: String,
  model: String,
  modelYear: Number
});

module.exports = carSchema;
