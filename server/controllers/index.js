const db = require('../database/dbQueries');

module.exports = {
  cars: {
    get: (req, res) => {
      db.getCar(req.params.carID)
        .then(car => res.status(200).send(car))
        .catch(() => res.status(500).end());
    },
    post: (req, res) => {
      db.insertCar(req.body)
        .then(() => res.status(201).end())
        .catch(() => res.status(500).end());
    }
  },
  users: {
    get: (req, res) => {
      db.getCarListForUser(req.params.userID)
        .then(docs => res.status(200).send(docs))
        .catch(() => res.status(500).end());
    }
  }
};
