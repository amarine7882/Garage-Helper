const path = require('path');
const compression = require('compression');
const cors = require('cors');

const moment = require('moment');
const express = require('express');

require('./database/index');
const router = require('./routes');

const PORT = process.env.PORT || 3000;
const DIR_PATH = path.join(__dirname, '/../public');

const server = express();

server.use(compression());
server.use(cors());

server.use('/api', router);

server.use('/', express.static(DIR_PATH));

server.listen(PORT, () => console.log(`listening on port ${PORT} @ ${moment().format('h:mm:ss')}`));
