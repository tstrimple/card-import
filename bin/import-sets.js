var importer = require('../src/importer'),
    Gatherer = require('../src/gatherer'),
    mongoose = require('mongoose'), 
    Set = require('../src/models/set'),
    async = require('async'),
    slugs = require('slugs');

mongoose.connect('mongodb://localhost/mtgio');

function refreshSets() {
  importer.getSetCodes(function(err, codes) {
    async.eachLimit(codes, 3, function(code, done) {
      importer.getSet(code, function(err, info) {
        info.slug = slugs(info.name);
        Set.findByIdAndUpdate(info.code, info, { upsert: true }, function(err, doc) {
          if(err) {
            console.log(err, json);
            return done();
          }

          console.log('done with ', info.code);
          return done();
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

refreshSets();