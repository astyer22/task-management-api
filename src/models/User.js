// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true }, // GitHub ID
  username: { type: String, required: true },               // GitHub username
  email: { type: String },                                  // GitHub email (may be null if not public)
  profileUrl: { type: String },                             // URL to GitHub profile
  avatarUrl: { type: String },                              // URL to GitHub avatar
  accessToken: { type: String },                            // OAuth access token
  refreshToken: { type: String }                            // OAuth refresh token (optional)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
