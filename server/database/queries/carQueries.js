const Car = require('../models/carModel');

exports.insertCar = ({ userID, carName, make, model, modelYear, mileage }) =>
  new Promise((res, rej) => {
    const document = new Car({
      userID,
      carName,
      make,
      model,
      modelYear,
      mileage,
      serviceItems: []
    });

    document
      .save()
      .then(result => res(result))
      .catch(err => rej(err));
  });

exports.getCar = ({ carID }) =>
  Car.findOne({ _id: carID })
    .select('-_id -userID -__v')
    .then(document => document)
    .catch(err => err);

exports.updateMileage = ({ carID }, { updateMileage }) =>
  new Promise((res, rej) => {
    const update = {
      $set: {
        mileage: updateMileage
      }
    };

    Car.findOneAndUpdate({ _id: carID }, update)
      .then(result => res(result))
      .catch(err => rej(err));
  });

exports.getCarListForUser = ({ userID }) =>
  Car.find({ userID })
    .select('_id carName make model modelYear')
    .then(docs => docs)
    .catch(err => err);

exports.deleteCar = ({ carID }) =>
  Car.findOneAndDelete({ _id: carID })
    .then(result => result)
    .catch(err => err);
