// src/routes/authRoutes.js

const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to initiate GitHub OAuth
router.get('/auth/github', (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/github/callback&scope=user`;
  res.redirect(githubAuthUrl); // Redirect to GitHub OAuth authorization page
});

// Handle the callback after GitHub OAuth
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/profile'); // Redirect user to their profile or another route after successful authentication
});

module.exports = router;
