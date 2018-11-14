const path = require('path');
const fs = require('fs');

const SRC_DIR = path.join(__dirname, '/server');
const DIST_DIR = path.join(__dirname, '/production/server/dist');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  target: 'node',
  node: {
    __dirname: false
  },
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  resolve: {
    extensions: ['.js', '.json', '.css']
  },
  externals: nodeModules
};
