import moment from 'moment';

export const generateModelYears = () => {
  let years = [];

  // Adding plus one to year to account for next model year cars
  const start = 1920;
  const end = new Date().getFullYear() + 1;

  for (let year = start; year <= end; year += 1) {
    years = [...years, year];
  }

  return years;
};

export const makeCarListValue = car => {
  if (car.carName) {
    return car.carName;
  }
  return `${car.modelYear} ${car.make} ${car.model}`;
};

export const numberWithCommas = x => {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return undefined;
};

export const displayIntervalsIfPresent = (serviceIntervalMonths, serviceIntervalMiles) => {
  let intervalString = '';

  if (serviceIntervalMonths > 0 && serviceIntervalMiles > 0) {
    intervalString = `Due every ${serviceIntervalMonths} months or ${numberWithCommas(
      serviceIntervalMiles
    )} miles`;
  } else if (serviceIntervalMonths > 0) {
    intervalString = `Due every ${serviceIntervalMonths} months`;
  } else {
    intervalString = `Due every ${numberWithCommas(serviceIntervalMiles)} miles`;
  }

  return intervalString;
};

export const displayNextDueIfPresent = (nextDueDate, nextDueMiles, serviceIntervalMonths) => {
  let nextDueString = '';

  if (nextDueMiles && serviceIntervalMonths) {
    nextDueString = `Next Due on ${moment(nextDueDate).calendar()} or at ${numberWithCommas(
      nextDueMiles
    )} miles`;
  } else if (!nextDueDate && !nextDueMiles) {
    nextDueString = '';
  } else if (!serviceIntervalMonths) {
    nextDueString = `Next Due at ${numberWithCommas(nextDueMiles)} miles`;
  } else if (!nextDueMiles) {
    nextDueString = `Next Due on ${moment(nextDueDate).calendar()}`;
  }

  return nextDueString;
};
