const moment = require('moment');
const server = require('./server.js');

const PORT = 3000;

server.listen(PORT, () => console.log(`listening on port ${PORT} @ ${moment().format('h:mm:ss')}`));
