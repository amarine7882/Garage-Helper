const moment = require('moment');

exports.findClosestCompletionForDateOrMileage = (
  {
    serviceName,
    lastCompletedDate,
    lastCompletedMileage,
    nextDueDate,
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

  if (nextDueDate) {
    const now = moment(new Date());
    const lastDue = moment(lastCompletedDate);
    const totalDays = serviceIntervalMonths * 30;
    const progress = moment.duration(now.diff(lastDue));
    const daysSoFar = progress.asDays();

    datePercentComplete = daysSoFar / totalDays;
  }

  if (!nextDueMileage) {
    return datePercentComplete;
  } else if (!nextDueDate) {
    return mileagePercentComplete;
  } else if (mileagePercentComplete > datePercentComplete) {
    mileagePercentComplete;
  } else if (datePercentComplete > mileagePercentComplete) {
    return datePercentComplete;
  }
};
