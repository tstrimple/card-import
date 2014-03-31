var mongoose = require('mongoose');

var setSchema = mongoose.Schema({
  _id: String,
  name: String,
  type: String,
  block: String
});

module.exports = mongoose.model('Set', setSchema);