var util = require('util'),
    Gatherer = require('../src/gatherer'),
    Oracle = require('../src/models/oracle'),
    mongoose = require('mongoose'),
    cheerio = require('cheerio');

mongoose.connect('mongodb://localhost/mtgio');

var stream = Oracle.find().stream();
var processing = 0;
stream.on('data', function(card) {
  card.index(function(err, res) {
    console.log('indexed', card._id, err, res);
  });
}).on('error', function(err) {
  console.log('error!', err);
}).on('close', function() {
  console.log('done');
});
