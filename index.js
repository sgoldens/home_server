const http = require('http');
// Parse response and routing
const express = require('express');
// Middleware - help to parse incoming HTTP requests
const bodyParser = require('body-parser');
// Middleware - Logging framework
const morgan = require('morgan');
// Our server app
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost:home_auth/home_auth')

// **** App Setup
// Debuggging using morgan, logging incoming requests
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app)

// **** Server Setup
const port = process.env.PORT || 8020;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);