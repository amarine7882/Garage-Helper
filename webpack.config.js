const path = require('path');
const webpack = require('webpack');

const SRC_DIR = path.join(__dirname, '/client/src');
const BUILD_DIR = path.join(__dirname, '/public/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
            'react-hot-loader/babel',
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
