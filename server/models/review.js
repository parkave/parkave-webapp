
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var schema = mongoose.Schema({
  title: {type: String, require: true, trim: true},
  date: { type: Date, default: Date.now },
  stars: {type: Number, min: 1, max: 5, default: 0},
  reviewer_id: {type: ObjectId, require: true},
  reviewee_id: {type: ObjectId, require:true},
  body: {type: String, require:true},
  lot_id: {type: String, default: "noid"}
});

var Review = mongoose.model('reviews', schema);

module.exports = {
  Review: Review
};