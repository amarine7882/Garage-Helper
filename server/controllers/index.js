const db = require('../database/dbQueries.js');

// TODO: removed db responses from server response.

module.exports = {
  cars: {
    get: (req, res) => {
      db.getCar(req.params.carID)
        .then(car => res.status(200).send(car))
        .catch(err => res.status(500).end(err));
    },
    post: (req, res) => {
      db.insertCar(req.body)
        .then(result => res.status(201).end(result))
        .catch(err => res.status(500).end(err));
    }
  }
};
