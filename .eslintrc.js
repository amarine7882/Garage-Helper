module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'prettier/prettier': ['error']
  }
};
