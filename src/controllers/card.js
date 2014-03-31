var Set = require('../models/set'),
    Card = require('../models/card'),
    Oracle = require('../models/oracle');

exports.viewSet = function(req, res) {
  Card.find({ setSlug: req.params.set }).sort({name: 1}).exec(function(err, cards) {
    res.render('set', { title: 'Set: ' + req.params.set, cards: cards });
  });
};

exports.viewCard = function(req, res) {
  Card.findOne({ setSlug: req.params.set, slug: req.params.card }).exec(function(err, card) {
    res.render('card', { title: 'Card: ' + card.name, card: card });
  });
};

exports.index = function(req, res) {
  res.render('index', {});
}
