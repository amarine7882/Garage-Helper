const path = require('path');
const compression = require('compression');
const cors = require('cors');
const moment = require('moment');
const express = require('express');
require('./database/index.js');

const DIR_PATH = path.join(__dirname, '/../public');
const PORT = 3000;

const server = express();

server.use(express.static(DIR_PATH));

server.use(compression());
server.use(cors());

server.listen(PORT, () => console.log(`listening on port ${PORT} @ ${moment().format('h:mm:ss')}`));
