var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({
  url: String,
  updated: Date,
  response: String,
  body: String
});

module.exports = mongoose.model('Request', requestSchema);
