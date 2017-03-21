const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

// Define our model
const postSchema = new Schema({  
  title:  String,
  text:   String,
  author: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean 
  }, { 
  retainKeyOrd: true
  }, { 
  autoIndex: true
});

// TODO - Implement post validation
// Before saving a model, run this function
// postSchema.pre('save', function (next) {
  // get access to the user model
  // const post = this;
  // ...
  // ...
// })

// Create the post class
const ModelClass = mongoose.model('post', postSchema);

// Export the model
module.exports = ModelClass;