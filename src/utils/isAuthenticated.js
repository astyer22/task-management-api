// src/utils/isAuthenticated.js
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();  // Proceed to the next route handler
  })(req, res, next);
};

module.exports = isAuthenticated;
