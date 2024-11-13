// src/routes/authRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate GitHub OAuth
router.get('/auth/github', passport.authenticate('github', { scope: ['user'] }));

// Handle the callback after GitHub OAuth
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  // Store the access token in session after successful authentication
  req.session.access_token = req.user.accessToken;

  // Redirect to Swagger UI or another protected route
  res.redirect('/swagger-ui'); // Adjust if Swagger UI has a different path
});

module.exports = router;
