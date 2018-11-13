/* eslint prefer-destructuring: 0 */
const mongoose = require('mongoose');

let { MONGO_USER, MONGO_PASS } = require('../config');

if (!MONGO_USER || !MONGO_PASS) {
  MONGO_USER = process.env.MONGO_USER;
  MONGO_PASS = process.env.MONGO_PASS;
}

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASS}@ds231723.mlab.com:31723/mechanic-helper`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('mLab connection established'))
  .catch(err => console.log(err));
