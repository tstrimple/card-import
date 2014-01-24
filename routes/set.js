var Set = require('../models/set'),
    Card = require('../models/card');

exports.all = function(req, res) {
  Set.find({}).sort({releaseDate: 1}).exec(function(err, sets) {
    var setsByType = {};
    for (var i = 0; i < sets.length; i++) {
      if(!setsByType[sets[i].type]) {
        setsByType[sets[i].type] = [];
      }

      setsByType[sets[i].type].push(sets[i]);
    };

    res.render('sets', { setTypes: setsByType });
  });
};

exports.view = function(req, res) {
  Card.find({ setSlug: req.params.set }).sort({name: 1}).exec(function(err, cards) {
    res.render('set', { title: 'Set: ' + req.params.set, cards: cards });
  });
};

exports.viewCard = function(req, res) {
  Card.findOne({ setSlug: req.params.set, slug: req.params.card }).exec(function(err, card) {
    console.log(card.rulings);
    res.render('card', { title: 'Card: ' + card.name, card: card });
  });
};
