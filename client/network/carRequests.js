import axios from 'axios';

export const requestCarList = userID =>
  axios
    .get(`/api/users/${userID}/cars`)
    .then(({ data }) => data)
    .catch(err => console.log(err));

export const requestCarDelete = (userID, displayedCar) =>
  axios.delete(`api/users/${userID}/cars/${displayedCar}`).catch(err => console.log(err));

export const postNewCar = (userID, payload) =>
  axios.post(`api/users/${userID}/cars`, { userID, ...payload }).catch(err => console.log(err));

export const requestCarData = (userID, displayedCar) =>
  axios
    .get(`api/users/${userID}/cars/${displayedCar}`)
    .then(({ data }) => data)
    .catch(err => console.log(err));

export const patchCarMileage = (userID, displayedCar, updateMileage) =>
  axios
    .patch(`api/users/${userID}/cars/${displayedCar}`, { updateMileage })
    .catch(err => console.log(err));
