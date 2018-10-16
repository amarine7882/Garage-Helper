const moment = require('moment');
const Car = require('../models/carModel');

exports.getServiceItems = ({ carID }) =>
  Car.findOne({ _id: carID })
    .select('serviceItems -_id')
    .then(data => {
      data.serviceItems.sort((a, b) => moment(a.nextDue) > moment(b.nextDue));
      return data;
    })
    .catch(err => err);

exports.addServiceItem = (
  { carID },
  { serviceName, serviceIntervalMonths, serviceIntervalMiles }
) =>
  new Promise((res, rej) => {
    const update = {
      $push: {
        serviceItems: {
          serviceName,
          serviceIntervalMonths,
          serviceIntervalMiles
        }
      }
    };

    Car.findOneAndUpdate({ _id: carID }, update, { upsert: true })
      .then(result => res(result))
      .catch(err => rej(err));
  });

exports.updateServiceItemCompleted = ({ itemID }, { mileage }) =>
  new Promise((res, rej) => {
    Car.findOne({ 'serviceItems._id': itemID })
      .select('serviceItems.$.lastCompletedDate -_id')
      .then(doc => doc.serviceItems[0])
      .then(({ lastCompletedDate, serviceIntervalMonths, serviceIntervalMiles }) => {
        if (serviceIntervalMonths < 1) return { serviceIntervalMiles, dueDate: 0 };
        const dueDate = moment(lastCompletedDate).add(serviceIntervalMonths, 'months');
        return { serviceIntervalMiles, dueDate };
      })
      .then(({ serviceIntervalMiles, dueDate }) => {
        const update = {
          $set: {
            'serviceItems.$.lastCompletedMileage': mileage,
            'serviceItems.$.lastCompletedDate': Date.now()
          }
        };
        if (dueDate !== 0) {
          update.$set['serviceItems.$.nextDueDate'] = dueDate;
        }
        if (serviceIntervalMiles > 0) {
          update.$set['serviceItems.$.nextDueMileage'] = mileage + serviceIntervalMiles;
        }

        Car.findOneAndUpdate({ 'serviceItems._id': itemID }, update, { upsert: true })
          .then(result => res(result))
          .catch(err => rej(err));
      });
  });

exports.deleteServiceItem = ({ carID, serviceItemID }) =>
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
