// Incoming requests start here, where they are sent to a
// controller for each resource, which will be responsible
// to create a response to send back to the client

const Authentication = require('./controllers/authentication');

const passportService = require('./services/passport');
const passport  = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  // HTTP GET '/'
  app.get('/', requireAuth, (request, response) => {
  // When the HTTP GET request is received, send back...
    response.send({ hi: 'there' });
  });

  // HTTP POST '/signup', with requireSignin as middleware for signin 
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  // HTTP 

};
