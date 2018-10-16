const moment = require('moment');
const Car = require('../models/carModel');

exports.getServiceItems = carID =>
  Car.findOne({ _id: carID })
    .select('serviceItems -_id')
    .then(data => {
      data.serviceItems.sort((a, b) => moment(a.nextDue) > moment(b.nextDue));
      return data;
    })
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

    Car.findOneAndUpdate({ _id: carID }, update, { upsert: true })
      .then(result => res(result))
      .catch(err => rej(err));
  });

exports.updateServiceItemCompleted = serviceItemID =>
  new Promise((res, rej) => {
    Car.findOne({ 'serviceItems._id': serviceItemID })
      .select('serviceItems.$.lastCompleted -_id')
      .then(doc => doc.serviceItems[0])
      .then(({ lastCompleted, serviceInterval }) =>
        moment(lastCompleted).add(serviceInterval, 'months')
      )
      .then(dueDate => {
        const update = {
          $set: {
            'serviceItems.$.lastCompleted': Date.now(),
            'serviceItems.$.nextDue': dueDate
          }
        };

        Car.findOneAndUpdate({ 'serviceItems._id': serviceItemID }, update, { upsert: true })
          .then(result => res(result))
          .catch(err => rej(err));
      });
  });

exports.deleteServiceItem = (carID, serviceItemID) =>
  new Promise((res, rej) => {
    const update = {
      $pull: {
        serviceItems: {
          _id: serviceItemID
        }
      }
    };

    Car.findOneAndUpdate({ _id: carID }, update)
      .then(result => res(result))
      .catch(err => rej(err));
  });
