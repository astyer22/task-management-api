// src/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start Google OAuth process
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // After successful authentication, generate JWT and send it to the client
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
