const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async (req, res, next) => {
    let authToken;

    if (req.cookies && req.cookies['auth']) {
      authToken = req.cookies['auth'];
     
    } else if (req.headers['authorization']){
      const header = req.headers['authorization'];
      const tokens = header.split(' ');
      if(tokens.length === 2) {
        authToken = tokens[1];
       
      }
    }

    if (authToken) {
      try {
        const user = jwt.verify(authToken, config.auth.jwtSecret);
        const now = new Date().getTime() / 1000;
        if(now < user.exp) {
          req.user = user;
        }

      }
      catch (err) {
        console.error('error trying to decode auth token', err);
      }
    }
    next();
  }