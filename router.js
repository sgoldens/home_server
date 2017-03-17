// Incoming requests start here, where they are sent to a
// controller for each resource, which will be responsible
// to create a response to send back to the client

const Authentication = require('./controllers/authentication');

module.exports = function (app) {
// HTTP GET '/'

  app.get('/', (request, response, next) => {
  // When the HTTP GET request is received, send back...
    response.send(['waisjdg', 'stone', 'CO2water']);
  });

  // HTTP POST '/signup'
  app.post('/signup', Authentication.signup);
};
