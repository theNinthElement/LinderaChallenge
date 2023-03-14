const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
    try {
      console.log(req.header);
      const token = req.header('Authorization').replace('Bearer ', '');
      console.log(token);
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);
      const user = await User.findOne({ _id: decoded._id });
  
      if (!user) {
        throw new Error();
      }
  
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Authentication failed' });
    }
  };
  
  module.exports = auth;