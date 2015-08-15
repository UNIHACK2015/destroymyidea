/**
 * Created by AlexRob on 15/08/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IdeaSchema = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Idea', IdeaSchema);