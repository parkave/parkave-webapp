var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {type: String, require: true, trim: true},
  email: {type: String, require: true, trim: true},
  password: {type: String, require: true, trim: true},
  birthdate: {type: String, require: true, trim: true},
  phone: {type: String, require: true, trim: true}
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};