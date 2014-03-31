var mongoose = require('mongoose');

var deckListSchema = mongoose.Schema({
  mainboard: [Oracle],
  sideboard: [Oracle]
});

var deckSchema = mongoose.Schema({
  owner: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  created: Date,
  updated: Date,
  name: String,
  description: String,
  ideaboard: [Oracle],
  decklist: Decklist
});

module.exports = mongoose.model('Oracle', oracleSchema);
