var request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    urls = require('./data/urls');

exports.getSetCodes = function(fn) {
  request(urls.codes(), function(err, res, body) {
    if(err || res.statusCode != 200) {
      return fn(err ? err : 'http error: ' + res.statusCode);
    }

    fn(err, JSON.parse(body));
  });
}

exports.getSetInfo = function(setCode, fn) {
  request(urls.setInfo(setCode), function(err, res, body) {
    if(err || res.statusCode != 200) {
      return fn(err ? err : 'http error: ' + res.statusCode);
    }

    var json = JSON.parse(body);
    delete json.cards;
    fn(err, json);
  });
}

exports.getSetCards = function(setCode, fn) {
  request(urls.setInfo(setCode), function(err, res, body) {
    if(err || res.statusCode != 200) {
      return fn(err ? err : 'http error: ' + res.statusCode);
    }

    var json = JSON.parse(body);
    fn(err, json.cards);
  });
}

exports.getCardRulings = function(id, fn) {
  request(urls.gatherer(id), function(err, res, body) {
    if(err || res.statusCode != 200) {
      return fn(err ? err : 'http error: ' + res.statusCode);
    }

    var $ = cheerio.load(body),
        rulings = [];
  
    $('.postContainer tr').each(function() {
      rulings.push({ 
        date: moment($(this).find("td:first-child").text().trim(), 'MM/DD/YYYY').format('YYYY-MM-DD'), 
        text: $(this).find("td:last-child").text().trim()});
    });

    fn(err, rulings);
  });
}
