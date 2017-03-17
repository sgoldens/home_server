// Logic to process HTTP requests
const User = require('../models/user');

// signup controller receives the POST request and processes it for response
exports.signup = function (request, response, next) {
    // console.log(request.body)
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
      response.json({ success: true });
      
    });
  });
};
