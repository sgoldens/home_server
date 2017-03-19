// Logic to process HTTP requests

const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config.js');

// Create a JWT for User model
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // Return a JWT Token for this User based on the 'sub'ject, timestamp, and the config.secret
  // iat = Issued At Time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(request, response, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  response.send({ token: tokenForUser(request.user) });
}

// signup controller receives the POST request and processes it for response
exports.signup = function (request, response, next) {
  const email = request.body.email;
  const password = request.body.password;

  // Input validation
  if (!email || !password) {
    return response.status(422).send({ error: 'You must provide an email and a password' });
  }


  // See if a user with the given email exists, and send a callback
  User.findOne({ email }, (err, existingUser) => {
    // return as many errors as there are in the returned error object
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return response.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password,
    });

    user.save((err) => {
      if (err) { return next(err); }
      // Respond to request indicating the user was created
      response.json({ token: tokenForUser(user)});
    });
  });
};
