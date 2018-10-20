import axios from 'axios';

export const requestServiceItems = (userID, displayedCar) =>
  axios
    .get(`/api/users/${userID}/cars/${displayedCar}/serviceItems`)
    .then(({ data }) => data)
    .catch(err => console.log(err));

export const requestDeleteServiceItem = (userID, displayedCar, id) =>
  axios
    .delete(`/api/users/${userID}/cars/${displayedCar}/serviceItems/${id}`)
    .catch(err => console.log(err));

export const patchServiceItem = (userID, displayedCar, id, mileage) =>
  axios
    .patch(`/api/users/${userID}/cars/${displayedCar}/serviceItems/${id}`, { mileage })
    .catch(err => console.log(err));

export const postServiceItem = (userID, displayedCar, payload) =>
  axios
    .post(`/api/users/${userID}/cars/${displayedCar}/serviceItems`, payload)
    .catch(err => console.log(err));
