/**
 * Created by jq on 15/08/2015.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  idea_id: Schema.Types.ObjectId,
  criticism: String,
  rating: {
    upvotes: Number,
    downvotes: Number
  },
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', CommentSchema);
