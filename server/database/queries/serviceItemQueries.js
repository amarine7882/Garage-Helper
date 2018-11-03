const moment = require('moment');
const Car = require('../models/carModel');

const { findClosestCompletionForDateOrMileage } = require('../../helpers/helpers');

exports.getServiceItems = ({ carID }) =>
  Car.findOne({ _id: carID })
    .select('serviceItems mileage -_id')
    .then(data => {
      const { mileage } = data;

      data.serviceItems.sort((a, b) => {
        const aFac = findClosestCompletionForDateOrMileage(a, mileage);
        const bFac = findClosestCompletionForDateOrMileage(b, mileage);

        if (aFac.completionFactor > bFac.completionFactor) return -1;
        if (aFac.completionFactor < bFac.completionFactor) return 1;
        if (aFac.completionFactor === bFac.completionFactor) return 0;

        if (aFac.type === 'mile' && bFac.type === 'mile') {
          if (a.nextDueMileage > b.nextDueMileage) return 1;
          if (a.nextDueMileage < b.nextDueMileage) return -1;
          if (a.nextDueMileage === b.nextDueMileage) return 0;
        }
        if (aFac.type === 'date' && bFac.type === 'date') {
          if (moment(a.nextDueDate) > moment(b.nextDueDate)) return 1;
          if (moment(a.nextDueDate) < moment(b.nextDueDate)) return -1;
          if (moment(a.nextDueDate) === moment(b.nextDueDate)) return 0;
        }
        return 0;
      });
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

exports.deleteServiceItem = ({ carID, itemID }) =>
  new Promise((res, rej) => {
    const update = {
      $pull: {
        serviceItems: {
          _id: itemID
        }
      }
    };

    Car.findOneAndUpdate({ _id: carID }, update)
      .then(result => res(result))
      .catch(err => rej(err));
  });
