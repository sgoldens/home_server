// **** Main starting point of application
// Native Node.js module for handling HTTP requests
const http = require('http');
// Parse response and routing
const express = require('express');
// Middleware - help to parse incoming HTTP requests
const bodyParser = require('body-parser');
// Middleware - Logging framework
const morgan = require('morgan');
const cors = require('cors');
// Our server app
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// **** DB Setup
mongoose.connect('mongodb://127.0.0.1:27017/blog')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("we're connected! db.name: " + db.name)
});

// **** App Setup
// Debuggging using morgan, logging incoming requests
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app)

// **** Server Setup
const port = process.env.PORT || 8020;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);