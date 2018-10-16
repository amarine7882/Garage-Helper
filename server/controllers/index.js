const { carQueries, serviceItemQueries } = require('../database/queries');

module.exports = {
  cars: {
    get: (req, res) => {
      carQueries
        .getCar(req.params)
        .then(car => res.status(200).send(car))
        .catch(() => res.status(500).end());
    },

    post: (req, res) => {
      carQueries
        .insertCar(req.body)
        .then(() => res.status(201).end())
        .catch(() => res.status(500).end());
    },

    getList: (req, res) => {
      carQueries
        .getCarListForUser(req.params)
        .then(docs => res.status(200).send(docs))
        .catch(() => res.status(500).end());
    },

    delete: (req, res) => {
      carQueries
        .deleteCar(req.params)
        .then(() => res.status(204).end())
        .catch(() => res.status(500).end());
    }
  },

  serviceItems: {
    get: (req, res) => {
      serviceItemQueries
        .getServiceItems(req.params)
        .then(serviceItems => res.status(200).send(serviceItems))
        .catch(err => res.status(500).send(err));
    },

    post: (req, res) => {
      serviceItemQueries
        .addServiceItem(req.params, req.body)
        .then(() => res.status(201).end())
        .catch(() => res.status(500).end());
    },

    patch: (req, res) => {
      serviceItemQueries
        .updateServiceItemCompleted(req.params)
        .then(() => res.status(204).end())
        .catch(() => res.status(500).end());
    },

    delete: (req, res) => {
      serviceItemQueries
        .deleteServiceItem(req.params)
        .then(() => res.status(204).end())
        .catch(() => res.status(500).end());
    }
  }
};
