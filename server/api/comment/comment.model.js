/**
 * Created by jq on 15/08/2015.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

function BaseCommentSchema(extension) {
  var schema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    criticism: String,
    rating: {
      upvotes: {type: Number, default: 0},
      downvotes: {type: Number, default: 0}
    },
    timestamp: {type: Date, default: Date.now}
  });

  if(extension) {
    schema.add(extension);
  }

  return schema;
}

var ReplySchema = BaseCommentSchema();
var CommentSchema = BaseCommentSchema({
  replies: [ReplySchema]
});

module.exports = {
  model: mongoose.model('Comment', CommentSchema),
  schema: CommentSchema
};
