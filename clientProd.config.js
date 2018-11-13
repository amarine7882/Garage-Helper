const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const BUILD_DIR = path.join(__dirname, '/production/app');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: 'production',
  plugins: [new CompressionPlugin()],
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
          cacheDirectory: true,
          plugins: [
            '@babel/plugin-transform-async-to-generator',
            ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  }
};
