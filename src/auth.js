// src/auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');  // User model to store OAuth data

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',  // Your callback URL
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user exists in database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // Create a new user if not found
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value,
            });
            await user.save();
        }

        // Return user data
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);  // Serialize the user into session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);  // Deserialize the user from session
    } catch (err) {
        done(err, null);
    }
});
