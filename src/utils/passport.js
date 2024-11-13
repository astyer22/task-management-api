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
    // Log the profile and tokens to see if they're being received correctly
    console.log("GitHub Profile:", profile);
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    // Find the user by GitHub ID
    let user = await User.findOne({ githubId: profile.id });

    // If the user doesn't exist, create a new one
    if (!user) {
      user = new User({
        githubId: profile.id,
        displayName: profile.displayName || profile.username,
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : 'No email provided',
        accessToken,
        refreshToken,
      });

      await user.save(); // Save the user to the database
    }

    // Pass the user to the `done` callback
    return done(null, user);
  } catch (err) {
    console.error("Error during GitHub authentication:", err);
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
    console.error("Error during user deserialization:", err);
    done(err, null);
  }
});
