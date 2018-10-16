const { carQueries, serviceItemQueries } = require('../database/queries');

module.exports = {
  cars: {
    get: (req, res) => {
      carQueries
        .getCar(req.params.carID)
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
        .getCarListForUser(req.params.userID)
        .then(docs => res.status(200).send(docs))
        .catch(() => res.status(500).end());
    },
    delete: (req, res) => {
      carQueries
        .deleteCar(req.params.carID)
        .then(() => res.status(200).end())
        .catch(() => res.status(500).end());
    }
  },

  serviceItems: {
    get: (req, res) => {
      serviceItemQueries
        .getServiceItems(req.params.carID)
        .then(serviceItems => res.status(200).send(serviceItems))
        .catch(err => res.status(500).send(err));
    },
    post: (req, res) => {
      const { serviceName, serviceInterval } = req.body;

      serviceItemQueries
        .addServiceItem(req.params.carID, serviceName, serviceInterval)
        .then(() => res.status(201).end())
        .catch(() => res.status(500).end());
    },
    patch: (req, res) => {
      serviceItemQueries
        .updateServiceItemCompleted(req.params.itemID)
        .then(() => res.status(201).end())
        .catch(() => res.status(500).end());
    },
    delete: (req, res) => {
      serviceItemQueries
        .deleteServiceItem(req.params.carID, req.params.itemID)
        .then(() => res.status(201).end())
        .catch(() => res.status(500).end());
    }
  }
};

// TODO: Fix status codes for patch and delete
