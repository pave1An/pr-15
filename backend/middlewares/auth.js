const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { jwtKey } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (err) {
    next(new UnauthorizedError('Токен некорректен'));
  }
  req.user = payload;
  next();
};
