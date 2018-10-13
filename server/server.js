const path = require('path');
const compression = require('compression');
const cors = require('cors');
const express = require('express');

const DIR_PATH = path.join(__dirname, '/../public');

const server = express();

server.use(express.static(DIR_PATH));
server.use(compression());
server.use(cors());

module.exports = server;
