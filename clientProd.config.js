/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const BUILD_DIR = path.join(__dirname, '/production/app');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  mode: 'production',
  plugins: [new CompressionPlugin({ filename: 'bundle.js' })],
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
            ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'border-radius-base': '10px',
                'card-actions-background': 'none',
                'primary-color': '#303f9f',
                'card-head-background': 'fade(#001970, 85%)',
                'card-head-color': '#fff',
                'layout-header-background': '#001970',
                'layout-sider-background': 'transparent',
                'layout-body-background': '#E1E3E5',
                'menu-bg': 'transparent'
              },
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', 'less']
  }
};
