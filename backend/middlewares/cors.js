const allowedCors = [
  'http://messto.nomoreparties.sbs',
  'https://messto.nomoreparties.sbs',
  'http://localhost:3000',
];

const allowCORS = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    const { method } = req;
    const ALLOWED_METHODS = 'GET,PUT,PATCH,POST,DELETE';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    if (method === 'OPTIONS') {
      const requestHeaders = req.headers['access-control-request-headers'];
      res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      next();
    }
  }
  next();
};

module.exports = { allowCORS };
