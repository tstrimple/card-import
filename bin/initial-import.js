var util = require('util'),
    request = require('request'),
    mongoose = require('mongoose'),
    async = require('async'),
    slug = require('slugs'),
    Set = require('../src/models/set'),
    Card = require('../src/models/card');

mongoose.connect('mongodb://localhost/mtgio');
var setUrlFormat = 'http://mtgjson.com/json/%s-x.json';

Set.find({}, function(err, sets) {
  async.eachLimit(sets, 5, processSet, function(err) {
    if(err) {
      throw err;
    }

    console.log('All done!');
    mongoose.connection.close();
  });
});

function processSet(set, done) {
  request(util.format(setUrlFormat, set.code), function(err, res, body) {
    var json = JSON.parse(body),
        cards = json.cards;

    json.slug = slug(json.name);
    /*delete json.cards;

    Set.findByIdAndUpdate(json.code, json, { upsert: true }, function(err, s) {
      if(err) {
        console.log(err, json);
      }

      done();
      console.log('done with ', set.code);
    });*/

    async.each(cards, function(card, done) {
      card.set = json.code;
      card.slug = slug(card.name);
      card.setSlug = slug(set.name);
      card.multiverseId = card.multiverseid;
      delete card.multiverseid;
      if(!card.rulings || !card.rulings.length) {
        done();
        return;
      }
      Card.findByIdAndUpdate(card.multiverseId, card, { upsert: true }, function(err, c) {
        console.log('updating rulings!', c.name);
        if(err) {
          console.log(err, card);
        }

        done();
      });
    }, function(err) {
      if(err) {
        throw err;
      }
      console.log(set.name, 'set complete!')
      done();
    });
  });
}

