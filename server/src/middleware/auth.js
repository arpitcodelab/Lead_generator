const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, env.jwtSecret);
      req.user = await User.findById(decoded.id).select('-password');
      if (req.user) {
        return next();
      }
    } catch (error) {
      // Token invalid, fall back to default admin user below
    }
  }

  // Direct access without login: attach default admin user
  try {
    let defaultAdmin = await User.findOne({ role: 'admin' });
    if (!defaultAdmin) {
      defaultAdmin = await User.findOne();
    }
    if (!defaultAdmin) {
      defaultAdmin = {
        _id: '000000000000000000000001',
        name: 'PDC Admin',
        email: 'admin@pixiedigitalcreatives.com',
        role: 'admin'
      };
    }
    req.user = defaultAdmin;
    return next();
  } catch (err) {
    req.user = {
      _id: '000000000000000000000001',
      name: 'PDC Admin',
      email: 'admin@pixiedigitalcreatives.com',
      role: 'admin'
    };
    return next();
  }
};

module.exports = { protect };
