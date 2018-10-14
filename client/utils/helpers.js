const generateModelYears = () => {
  let years = [];

  // Adding plus one to year to account for next model year cars
  const start = 1900;
  const end = new Date().getFullYear() + 1;

  for (let year = start; year <= end; year += 1) {
    years = [...years, year];
  }

  return years;
};

export default generateModelYears;
