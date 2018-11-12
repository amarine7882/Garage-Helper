module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    'prettier/prettier': ['error']
  }
};
