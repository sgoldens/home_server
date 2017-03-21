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

// findOne receives the GET request with parameters
// and processes a query, finding the asset, and
// returning it in the response.
exports.findPost =  function(request, response, next) {
  // query.findOne() example from the mongoose docs: 
  // var query = kitten({ color: 'gray' })
  // query.findOne( (err, kitten) => {
  //    if (err) { return response.status(500).send(err) }
  //    if (kitten) {
  //        response.send(kitten)
  //    }
  // })
  const targetPost = mongoose.get({ key: request.params.value })
  if (targetPost) {
    console.log(targetPost);
  }
  Post.findOne( (err, targetPost ) => {
    if (err) {
    // TODO - Research and verify server status codes
      return response.status(500).send(err)
    } else {
      if (targetPost) {
        response.send(targetPost)
      }
    }
  })
}

// TODO Update self on 'next' usage for iterating over multiple (err)s

// updatePost receives the PUT request with parameters
exports.updatePost = function(request, response, next) {
  // and processes a query to locate the asset and grab it,
  Post.findOne( (err, post ) => {
    if (err) { return response.status(500).send(err)
    } else {
    if(request != undefined) {          
      // then modifications are made and the newly updated document
      if (request.body.title != null ) post.title = request.body.title;
      if (request.body.text != null ) post.text = request.body.text;
      if (request.body.author != null ) post.author = request.body.author;
      if (request.body.hidden != null ) post.hidden = request.body.hidden;
    }
      post.save( function (err) {
        if (err) { return response.status(500).send (err);
        } else {
          response.json({ message: "Post Updated!" });
        }
      })
    }}
  )
}

// deletePost receives the DELETE request,
// finds the first document to match the conditions
// and removes the document from the database.
exports.deletePost = function(request, response, next) {
  Post.remove({id: "58cf306181cf25a51d2b5caa"}, function (err) { 
    return response.status(500).send(err) });
  response.json({ message: "Post Deleted!"})
}