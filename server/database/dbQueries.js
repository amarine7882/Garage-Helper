const Car = require('./models/carModel');

exports.insertCar = ({ userID, carID, name, make, model, modelYear }) =>
  new Promise((res, rej) => {
    const document = new Car({
      userID,
      carID,
      name,
      make,
      model,
      modelYear
    });

    document
      .save()
      .then(result => res(result))
      .catch(err => rej(err));
  });

exports.getCar = carID =>
  Car.find({ carID })
    .then(document => document)
    .catch(err => err);