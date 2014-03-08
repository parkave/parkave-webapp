
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var schema = mongoose.Schema({
  user_id: {type: ObjectId, require:true},
  title: {type: String, require: true, trim: true},
  address: {
    street: {type: String, require: true, trim: true},
    city: {type: String, require: true, trim: true},
    zip: {type: String, require: true, trim: true},
    state: {type: String, require: true, trim: true},
  },
  lat: Number,
  lon: Number,
  //do not set these values
  numberOfSpots: {type: Number, default:0},
  averagePrice: {type: Number, default: 0}
});

var Lot = mongoose.model('lots', schema);

module.exports = {
  Lot: Lot
};
