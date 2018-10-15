const Car = require('../models/carModel');

exports.getServiceItems = carID =>
  Car.findById(carID)
    .select('serviceItems -_id')
    .then(serviceItems => serviceItems)
    .catch(err => err);

exports.addServiceItem = (carID, serviceName, serviceInterval) =>
  new Promise((res, rej) => {
    const update = {
      $push: {
        serviceItems: {
          serviceName,
          serviceInterval
        }
      }
    };

    Car.findByIdAndUpdate(carID, update, { upsert: true })
      .then(result => res(result))
      .catch(err => rej(err));
  });
