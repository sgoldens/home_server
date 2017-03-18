// Incoming requests hit passport for strategies 1 or 2
// #1 - Verify user with a JWT
// #2 - Verify user with a username and password
// Then hand off to the Route Handler

const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
  // Whenever we pass a request, extract the JWT from the
  // authorization header
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret

};

// Create JWT strategy
// payload is the decoded JWT token
// done is a callback to... 
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    // If it does, 
    if (user) {
      // call 'done' with that
      done(null, user);
    } else {
      // otherwise, call done without a user object
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);