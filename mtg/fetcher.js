var util = require('util'),
    request = require('request'),
    cheerio = require('cheerio'),
    setData = require('../data/sets.json'),
    slugs = require('slugs');

exports.fetchSets = function(cb) {
  var sets = setData.sets,
      setUrlFormat = '/%s/';

  var blocks = {};
  for (var i = 0; i < sets.length; i++) {
    var set = sets[i];
    if(!blocks[set.block]) {
      blocks[set.block] = [];
    }

    set.url = util.format(setUrlFormat, set.code);
    blocks[set.block].push(set);
  };

  cb(null, blocks);
}

exports.fetchCard = function() {
  
}

exports.fetchSet = function(set, cb) {
  var url = util.format('http://magiccards.info/%s/en.html', set);
  var imageFormat = 'http://magiccards.info/scans/en/%s/%s.jpg';
  var cardUrlFormat = '/%s/%s';
  request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      var $ = cheerio.load(body);
      var cards = [];
      $('table tr.odd,table tr.even').each(function() {
        var parts = $(this).find('td');
        var card = {
          number: parts.eq(0).text(),
          name: parts.eq(1).text(),
          summary: parts.eq(2).text(),
          cost: parts.eq(3).text(),
          rarity: parts.eq(4).text(),
          set: parts.eq(6).text(),
          setId: set
        };

        card.image = util.format(imageFormat, card.setId, card.number);
        card.slug = slugs(card.name);
        card.url = util.format(cardUrlFormat, card.setId, card.slug);
        cards.push(card);
      });

      cb(null, cards);
    }
  });
}