var importer = require('../src/importer'),
    Gatherer = require('../src/gatherer'),
    mongoose = require('mongoose'), 
    Set = require('../src/models/set'),
    Card = require('../src/models/card'),
    async = require('async'),
    slugs = require('slugs');

mongoose.connect('mongodb://localhost/mtgio');

function importCards() {
  importer.getSetCodes(function(err, codes) {
    async.eachLimit(codes, 3, function(code, done) {
      importer.getSet(code, function(err, set) {
        async.eachLimit(set.cards, 10, function(card, done) {
          card.set = code;
          card.slug = slugs(card.name);
          card.setSlug = slugs(set.name);
          card.multiverseId = card.multiverseid;
          delete card.multiverseid;
          
          Card.findByIdAndUpdate(card.multiverseId, { setSlut: card.setSlug }, function(err, c) {
            if(err) {
              console.log(err, card);
            }

            done();
          });

        }, function(err) {
          console.log('done importing set cards!', err);
          done();
        });
      });
    }, function(err) {
      if(err) {
        return console.log('done with errors!', err);
      }

      console.log('done!');
    })
  });
}

importCards();
