/**
 * Created by AlexRob on 15/08/15.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Comment = require('../comment/comment.model.js');

var IdeaSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  description: String,
  rating: {
    back_it: {
      type: Number,
      default: 0
    },
    destroy_it: {
      type: Number,
      default: 0
    }
  },
  comments: [Comment.schema],
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Idea', IdeaSchema);
