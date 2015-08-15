/**
 * Created by AlexRob on 15/08/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IdeaSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    name: String,
    description: String,
    rating: {
      back_it: Number,
      destroy_it: Number
    },
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Idea', IdeaSchema);
