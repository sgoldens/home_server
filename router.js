const Authentication = require('./controllers/authentication');

module.exports = function(app) {
	// Incoming requests start here, where they are sent to a 
	// controller for each resource, which will be responsible
	// to create a response to send back to the client
	
	// HTTP GET '/'
	// app.get('/', function(request, response, next) {
	// 	// When the HTTP GET request is received,
	// 	// send back...
	// 	response.send(['waisjdg', 'stone', 'CO2water']);
	// });

	// HTTP POST '/signup'
	app.post('/signup', Authentication.signup);

}