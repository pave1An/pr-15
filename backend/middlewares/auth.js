const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { setSecretKey } = require('../utils/secretKey');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, setSecretKey());
  } catch (err) {
    next(new UnauthorizedError('Токен некорректен'));
  }
  req.user = payload;
  next();
};
