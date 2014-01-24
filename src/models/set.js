var mongoose = require('mongoose');

var setSchema = mongoose.Schema({
  _id: String,
  name: String,
  slug: String,
  code: String,
  releaseDate: String,
  border: String,
  type: String,
  block: String,
  cards: Number
});

setSchema.methods.setUrl = function() {
  return '/' + this.slug;
}

module.exports = mongoose.model('Set', setSchema);