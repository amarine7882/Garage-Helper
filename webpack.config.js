const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const BUILD_DIR = path.join(__dirname, '/public/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/react', '@babel/preset-env'],
          plugins: ['babel-plugin-styled-components', '@babel/plugin-transform-async-to-generator']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  }
};
