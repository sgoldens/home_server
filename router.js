// Incoming requests start here, where they are sent to a
// controller for each resource, which will be responsible
// to create a response to send back to the client

const path = require('path');
const PostModel = require('./models/post')

const mongoose = require('mongoose');

// Controllers
const Authentication = require('./controllers/authentication');
const PostController = require('./controllers/post_controller');

// Services
const passportService = require('./services/passport');
const passport  = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// Server routes
module.exports = function (app) {
  // HTTP POST '/signup' & 'signin', with requireSignin as middleware for signin 
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  // HTTP POST '/posts' for adding new posts
  app.post('/posts', requireAuth, PostController.addPost);

  // HTTP GET '/posts' for getting all posts
  app.get('/posts', requireAuth, PostController.findPosts);
  
  // HTTP GET '/posts' for getting one post
  app.get('/posts/:post_id', requireAuth, PostController.findPost);

  // HTTP PUT '/posts/:post' for updating posts
  app.put('/posts/:post_id', requireAuth, PostController.updatePost);

  // HTTP DELETE  '/posts/:post' for updating posts
  app.delete('/posts/:post_id', requireAuth, PostController.deletePost);

  // HTTP GET '*' "catch all" route on the express server that captures all page requests and direct them to the client.
  app.get('*', requireSignin, (request, response) => {
  // When the HTTP GET '*' request is received, send back index.html
    response.redirect(200, '/posts');
  });

};
