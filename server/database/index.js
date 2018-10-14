const mongoose = require('mongoose');

const db = mongoose
  .connect(
    'mongodb://client:mechanic123@ds231723.mlab.com:31723/mechanic-helper',
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('mLab connection established'))
  .catch(err => console.log(err));

exports = db;
