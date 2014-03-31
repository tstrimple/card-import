var mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic');

var oracleSchema = mongoose.Schema({
  _id: String,
  name: String,
  rarity: String,
  manaCost: String,
  cmc: Number,
  types: [String],
  text: String,
  power: String,
  toughness: String,
  loyalty: Number,
  colors: [String],
  rulings: [{ 
    date: Date, 
    text: String }],
  printings: [{
    _id: Number,
    expansion: String,
    expansionNumber: String
  }]
}, { collection: 'oracle' });

oracleSchema.plugin(mongoosastic, {
  index: 'mtgio'
});

module.exports = mongoose.model('Oracle', oracleSchema);
