// src/utils/passport.js

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();  // Ensure you load the environment variables

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  // This is where you would either create a user or retrieve an existing one from the database
  // For simplicity, we'll just pass the profile along here
  return done(null, profile);  // You might want to save the profile data to the database
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
