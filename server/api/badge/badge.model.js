/**
 * Created by jq on 15/08/2015.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BadgeSchema = new Schema({
  id: Number,
  name: String,
  short_desc: String,
  points: Number,
  tasks: [{
    task_name: String,
    task_logic: String
  }]

});

module.exports = { 
	model: mongoose.model('Badge', BadgeSchema),
	schema: BadgeSchema
}
