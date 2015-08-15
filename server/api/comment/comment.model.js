/**
 * Created by jq on 15/08/2015.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  criticism: String,
  rating: {
    upvotes: Number,
    downvotes: Number
  },
  timestamp: {type: Date, default: Date.now}
});

module.exports = {
  model: mongoose.model('Comment', CommentSchema),
  schema: CommentSchema
};
