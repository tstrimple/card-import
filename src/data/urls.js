var util = require('util');

exports.codes = function() { return 'http://mtgjson.com/json/SetCodes.json' }
exports.setInfo = function(set) { return util.format('http://mtgjson.com/json/%s-x.json', set); }
exports.setCards = function(set) { return util.format('http://mtgjson.com/json/%s-x.json', set); }
exports.cardImage = function(id) { return util.format('http://mtgimage.com/multiverseid/%s.jpg', id); }
exports.gathererDetails = function(id) { return util.format('http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=%s', id); }
exports.oracleDetails = function(id) { return util.format('http://gatherer.wizards.com/Pages/Card/Details.aspx?printed=true&multiverseid=%s', id); }
exports.gathererPrintings = function(id) { return util.format('http://gatherer.wizards.com/Pages/Card/Printings.aspx?multiverseid=%s', id); }
exports.gathererLanguages = function(id) { return util.format('http://gatherer.wizards.com/Pages/Card/Languages.aspx?multiverseid=%s', id); }
