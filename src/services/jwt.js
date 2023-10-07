const jwt = require('jsonwebtoken');

const config = {
  pass: process.env.JWT_PASS || 'secret',
  options: {
    expiresIn: '8h',
  },
};

const create = (data) => {
  return jwt.sign(data, config.pass, config.options);
};

const getUser = (token) => {
  try {
    jwt.verify(token, config.pass);
  } catch (error) {
    return;
  }
};

module.exports = {
  create,
  getUser,
};
