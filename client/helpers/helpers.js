export const generateModelYears = () => {
  let years = [];

  // Adding plus one to year to account for next model year cars
  const start = 1900;
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

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const displayIntervalsIfPresent = (serviceIntervalMonths, serviceIntervalMiles) => {
  let intervalString = '';

  if (serviceIntervalMonths > 0 && serviceIntervalMiles > 0) {
    intervalString = `Due every ${serviceIntervalMonths} months or ${serviceIntervalMiles} miles`;
  } else if (serviceIntervalMonths > 0) {
    intervalString = `Due every ${serviceIntervalMonths} months`;
  } else {
    intervalString = `Due every ${serviceIntervalMiles} miles`;
  }

  return intervalString;
};
