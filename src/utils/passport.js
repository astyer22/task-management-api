// src/utils/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you have a User model

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, (token, tokenSecret, profile, done) => {
  User.findOrCreate({ googleId: profile.id }, (err, user) => {
    return done(err, user);
  });
}));

// JWT Strategy
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, (jwt_payload, done) => {
  User.findById(jwt_payload.id, (err, user) => {
    if (err) return done(err, false);
    return done(null, user);
  });
}));
