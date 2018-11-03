const moment = require('moment');

exports.findClosestCompletionForDateOrMileage = (
  {
    lastCompletedDate,
    lastCompletedMileage,
    nextDueMileage,
    serviceIntervalMiles,
    serviceIntervalMonths
  },
  mileage
) => {
  let mileagePercentComplete;
  let datePercentComplete;

  if (nextDueMileage) {
    const progress = mileage - lastCompletedMileage;

    mileagePercentComplete = progress / serviceIntervalMiles;
  }

  if (serviceIntervalMonths) {
    const now = moment(new Date());
    const lastDue = moment(lastCompletedDate);
    const totalDays = serviceIntervalMonths * 30;
    const progress = moment.duration(now.diff(lastDue));
    const daysSoFar = progress.asDays();

    datePercentComplete = daysSoFar / totalDays;
  }

  if (!nextDueMileage) {
    return { type: 'date', completionFactor: datePercentComplete };
  }
  if (!serviceIntervalMonths) {
    return { type: 'mile', completionFactor: mileagePercentComplete };
  }
  if (mileagePercentComplete > datePercentComplete) {
    return { type: 'mile', completionFactor: mileagePercentComplete };
  }
  if (datePercentComplete > mileagePercentComplete) {
    return { type: 'date', completionFactor: datePercentComplete };
  }
};
