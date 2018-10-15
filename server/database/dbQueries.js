const Car = require('./models/carModel');

exports.insertCar = ({ userID, carName, make, model, modelYear }) =>
  new Promise((res, rej) => {
    const document = new Car({
      userID,
      carName,
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
  Car.findById(carID)
    .select('-_id -userID -__v')
    .then(document => document)
    .catch(err => err);

exports.getCarListForUser = userID =>
  Car.find({ userID })
    .select('_id carName make model modelYear')
    .then(docs => docs)
    .catch(err => err);
