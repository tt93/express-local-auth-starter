const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (req, res, next) => {
    if (req.cookies && req.cookies['auth']) {
      const token = req.cookies['auth'];
      if (token) {
        try {
          const user = jwt.verify(token, config.auth.jwtSecret);
          req.user = user;
        }
        catch (err) {
          console.error('error trying to decode auth token', err);
        }
      }
    } else if (req.headers['Authorization']){
        debugger;
    }
    next();
  }