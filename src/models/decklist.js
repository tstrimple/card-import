var mongoose = require('mongoose');

var decklistSchema = mongoose.Schema({
  created: Date,
  mainboard: [Oracle],
  sideboard: [Oracle]
});

module.exports = mongoose.model('Decklist', decklistSchema);
