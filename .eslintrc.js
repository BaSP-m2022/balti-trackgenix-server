module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-unused-vars': 'warn',
    'no-plusplus': 0,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'max-len': [
      'error',
      120,
    ],
  },
};
