var util = require('util'),
    request = require('request'),
    Set = require('./models/set'),
    Card = require('./models/card'),
    mongoose = require('mongoose'),
    async = require('async'),
    slug = require('slugs'),
    cheerio = require('cheerio');

mongoose.connect('mongodb://localhost/mtgdata');
var gathererUrl = 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=%s';

var c = 0;
var stream = Card.find({}, {_id: 1}, function(err, ids) {
  async.eachSeries(ids, function(thing, done) {
    c++;
    var url = util.format(gathererUrl, thing._id);
    //url = gathererUrl;
    request(url, function(err, res, body) {
      var $ = cheerio.load(body);
      var counter = 0;
      var date = '';
      var ruling = '';
      var rulings = [];
      $('.postContainer td').each(function(i, e) {
        counter++;
        if(counter % 2 == 0) {
          ruling = $(this).text();
          rulings.push({date: date, text: ruling});
        } else {
          date = $(this).text();
        }
      });

      if(!rulings.length) {
        console.log('-' + c + '/' + ids.length);
        done();
        return;
      }

      Card.findByIdAndUpdate(thing._id, { rulings: rulings }, function(err, doc) {
        if(err) {
          console.log(err);
        }
        console.log('+' + c + '/' + ids.length);
        done();
      });
    });
  }, function() {
  })

});
