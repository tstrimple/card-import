var importer = require('../src/importer'),
    Gatherer = require('../src/gatherer'),
    mongoose = require('mongoose'), 
    Set = require('../src/models/set'),
    Card = require('../src/models/card'),
    Oracle = require('../src/models/oracle'),
    async = require('async'),
    slugs = require('slugs')
    asciify = require('asciify-string'),
    util = require('util');


var mongoConnection = process.env.MONGODB_CONNECTIONSTRING || 'mongodb://localhost/mtgio';
mongoose.connect(mongoConnection);

function importCards(set, cards, callback) {  
  process.stdout.clearLine();
  var processed = 0;
  async.each(cards, function(card, done) {
    var id = slugs(asciify(card.name));
    Oracle.findById(id, function(err, oracle) {
      if(!oracle) {
        oracle = new Oracle();
        oracle._id = id;
        oracle.name = card.name;
        oracle.slug = id;
        oracle.rarity = card.rarity;
        oracle.manaCost = card.manaCost;
        oracle.cmc = card.cmc;
        oracle.type = card.type;
        oracle.types = card.types;
        oracle.text = card.text;
        oracle.power = card.power;
        oracle.toughness = card.toughness;
        oracle.loyalty = card.loyalty;
        oracle.colors = card.colors;
        oracle.rulings = card.rulings;
      }

      if(!oracle.printings.some(function(printing) { return printing._id == card.multiverseid; })) {
        oracle.printings.push({
          _id: card.multiverseid,
          expansion: set.name, 
          expansionNumber: card.number });
      }

      oracle.save();
      processed++;
      process.stdout.write(util.format('processing set %s %s/%s\r', set.name, processed, set.cards.length));
      done();
    });
  }, function(err) {
    process.stdout.write('/r/n');
    callback();
  });
}

function processSets(set) {
  importer.getSetCodes(function(err, codes) {
    async.eachSeries(codes, function(code, done) {
      importer.getSet(code, function(err, set) {
        process.stdout.write(util.format('processing set %s %s/%s\r', set.name, 0, set.cards.length));
        importCards(set, set.cards, function() {
          done();
        });
      });
    }, function(err) {
      mongoose.connection.close()
      if(err) {
        return console.log('done with errors!', err);
      }

      console.log('done!');
    })
  });
}

processSets();
