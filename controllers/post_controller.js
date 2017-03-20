const Post = require('../models/post')

const mongoose = require('mongoose');

let posts = []

// addPost receives the POST request and processes it for response
exports.addPost = function (request, response, next) {
  const title = request.body.title
  const text = request.body.text
  const author = request.body.author
  const hidden = request.body.hidden

  // Input validation
  if (!title || !text || !author) {
    return response.status(422).send({ error: 'You must provide a post title, text, and author.'})
  }

  // Create a new Post
  const post = new Post({
    title,
    text,
    author,
    hidden
  })

  // Save it to the database
  post.save((err) => {
    if (err) { return next(err) }
    // Response to request indicating the post was created
    response.json({ post: post })
  })
}

// find receives the GET request and runs find(), which 
// without a query will return all results
  exports.findPosts = function(request, response, next) {
    Post.find( (err, posts) =>  {
      if (err) {
      // If there is an error while searching. This 500 error
      // does not mean the nothing was found.
      return response.status(500).send(err)
    } else {
      response.send(posts)
    } 
  })
}