const mongoose = require('mongoose');

const { MONGO_USER, MONGO_PASS } = require('../config');

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASS}@ds231723.mlab.com:31723/mechanic-helper`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('mLab connection established'))
  .catch(err => console.log(err));
