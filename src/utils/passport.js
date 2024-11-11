// src/utils/passport.js

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User'); // Import your User model
require('dotenv').config();  // Ensure you load the environment variables

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find the user by GitHub ID
    let user = await User.findOne({ githubId: profile.id });

    // If the user doesn't exist, create a new one
    if (!user) {
      user = new User({
        githubId: profile.id,
        displayName: profile.displayName || profile.username,
        email: profile.emails[0].value, // GitHub may not always provide email, so check your app's permissions
        accessToken,
        refreshToken,
      });

      await user.save(); // Save the user to the database
    }

    // Pass the user to the `done` callback
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
