var mongoose = require('mongoose'),
    util = require('util');

var cardSchema = mongoose.Schema({
  _id: Number,
  set: String,
  setSlug: String,
  layout: String,
  name: String,
  slug: String,
  names: [String],
  manaCost: String,
  cmc: Number,
  colors: [String],
  type: String,
  supertypes: [String],
  types: [String],
  subtypes: [String],
  rarity: String,
  text: String,
  oracle: String,
  flavor: String,
  artist: String,
  number: String,
  power: String,
  toughness: String,
  loyalty: Number,
  variations: [Number],
  imageName: String,
  watermark: String,
  border: String,
  hand: Number,
  life: Number,
  rulings: mongoose.Schema.Types.Mixed,
  printings: [String]
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

cardSchema.methods.cardUrl = function() {
  return '/' + this.setSlug + '/' + this.slug;
}

cardSchema.methods.imageUrl = function() {
  return util.format('http://mtgimage.com/multiverseid/%s.jpg', this._id);
}

cardSchema.methods.imageUrl = function() {
  return util.format('http://mtgimage.com/multiverseid/%s.jpg', this._id);
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
  return smartTrunc(this.text, length);
}

module.exports = mongoose.model('Card', cardSchema);
