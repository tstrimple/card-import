var mongoose = require('mongoose'),
    util = require('util');

var cardSchema = mongoose.Schema({
  multiverseId: Number,

  name: String,
  slug: String,
  rarity: String,
  manaCost: String,
  cmc: Number,

  alternate: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    slug: String,
    multiverseId: Number,
  },
  
  type: {
    text: String,
    types: [String],
    supertype: String,
    subtype: String
  },

  text: {
    printed: String,
    oracle: String,
  },

  flavor: String,  
  artist: String,
  power: String,
  toughness: String,
  loyalty: Number,

  extra: {
    layout: String,
    names: [String],
    variations: [Number],
    colors: [String],
  },

  rulings: [{ 
    date: Date, 
    text: String }],
});

function smartTrunc(text, length) {
  if(!text) {
    return text;
  }

  if(text.length < length) {
    console.log('not trunc!', text.length, length);
    return text;
  }

  text = text.substr(0, length - 1);
  console.log('trunc', length, text);
  return text.substr(0, text.lastIndexOf(' ')) + '...';
}

cardSchema.methods.smartType = function() {
  var smartType = this.type;
  if(this.power && this.toughness) {
    smartType += util.format(' %s/%s', this.power, this.toughness);
  }

  if(this.loyalty) {
    smartType += util.format(' (loyalty: %s)', this.loyalty);
  }

  return smartType;
}

cardSchema.methods.description = function(length) {
  if(!length) {
    return this.text;
  }

  return smartTrunc(this.text, length);
}

module.exports = mongoose.model('Card', cardSchema);
