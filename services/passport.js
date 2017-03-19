// Incoming requests hit passport for strategies 1 or 2
// #1 - Verify user with a JWT
// #2 - Verify user with a username and password
// #3 - Local strategy
// Then hand off to the Route Handler

const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// Create local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
	User.findOne({ email: email }, function(err, user) {
		if (err) { return done(err) }
		if (!user) { return done(null, false) }

    // compare passwords - is `password` equal to user.password?
		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err) }
			if (!isMatch) { return done(null, false) }

			return done(null, user) 
		})
	})
})

// Setup options for JWT Strategy
const jwtOptions = {
  // Whenever we pass a request, extract the JWT from the
  // authorization header
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret

}

// Create JWT strategy
// payload is the decoded JWT token
// done is a callback to... 
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
	User.findById(payload.sub, function(err, user) {
		if (err) { return done(err, false) }

    // If it does, 
		if (user) {
      // call 'done' with that
			done(null, user)
		} else {
      // otherwise, call done without a user object
			done(null, false)
		}
	})
})

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)