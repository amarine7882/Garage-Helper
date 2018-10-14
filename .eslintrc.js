module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-console': 0,
    'prettier/prettier': ['error']
  }
};
