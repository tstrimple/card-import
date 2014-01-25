var request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    urls = require('./data/urls');

function Gatherer(id) {
  this.id = id;
  this.detailsBody = null;
  this.oracleBody = null;
  this.printingsBody = null;
  this.languageBody = null;
}

Gatherer.prototype.error = function(err) {
  console.log('ERROR: ', err);
}

Gatherer.prototype.loadDetails = function(fn, cb) {
  request(urls.gathererDetails(this.id), function(err, res, body) {
    if(err || res.statusCode != 200) {
      return this.error(err ? err : 'http error: ' + res.statusCode);
    }

    this.detailsBody = body;
    fn.call(this, cb);
  });
}

Gatherer.prototype.loadOracle = function(fn, cb) {
  request(urls.oracleDetails(this.id), function(err, res, body) {
    if(err || res.statusCode != 200) {
      return this.error(err ? err : 'http error: ' + res.statusCode);
    }

    this.oracleBody = body;
    fn.call(this, cb);
  });
}

Gatherer.prototype.loadPrintings = function(fn, cb) {
  request(urls.gathererPrintings(this.id), function(err, res, body) {
    if(err || res.statusCode != 200) {
      return this.error(err ? err : 'http error: ' + res.statusCode);
    }

    this.printingsBody = body;
    fn.call(this, cb);
  });
}

Gatherer.prototype.loadLanguages = function(fn, cb) {
  request(urls.gathererLanguages(this.id), function(err, res, body) {
    if(err || res.statusCode != 200) {
      return this.error(err ? err : 'http error: ' + res.statusCode);
    }

    this.languageBody = body;
    fn.call(this, cb);
  });
}

Gatherer.prototype.getCardDetails = function(fn) {
  return {};
}

Gatherer.prototype.getRulings = function(fn) {
  if(!this.detailsBody && !this.oracleBody) {
    return this.loadDetails(this.getRulings, fn);
  }

  var $ = cheerio.load(this.detailsBody ? this.detailsBody : this.oracleBody),
      rulings = [];

  $('.postContainer tr').each(function() {
    rulings.push({ 
      date: moment($(this).find('td:first-child').text().trim(), 'MM/DD/YYYY').format('YYYY-MM-DD'), 
      text: $(this).find('td:last-child').text().trim()});
  });

  return fn(rulings);
}

Gatherer.prototype.getLanguages = function(fn) {
  if(!this.languageBody) {
    return this.loadLanguages(this.getLanguages, fn);
  }
  
  var $ = cheerio.load(this.languageBody),
      languages = {};

  $('.cardList tr.cardItem').each(function() {
    var name = $(this).find('td:first-child').text().trim();
    var language = $(this).find('td:nth-child(2)').text().trim();  
    languages[language] = name;
  });

  return fn(languages);
}

Gatherer.prototype.getLegalFormats = function(fn) {
  if(!this.printingsBody) {
    return this.loadPrintings(this.getLegalFormats, fn);
  }

  var $ = cheerio.load(this.printingsBody),
      formats = {};

  $('.cardList').eq(-1).find('tr.cardItem').each(function() {
    var format = $(this).find('td:first-child').text().trim();
    var legality = $(this).find('td:nth-child(2)').text().trim();
    if(legality == 'Special') {
      legality = legality = $(this).find('td:last-child').text().trim();
    }

    formats[format] = legality;
  });

  return fn(formats);
}

Gatherer.prototype.getRating = function(fn) {
  if(!this.detailsBody && !this.oracleBody) {
    return this.loadDetails(this.getRating, fn);
  }

  var $ = cheerio.load(this.detailsBody ? this.detailsBody : this.oracleBody);
  fn($('.textRatingValue').text().trim());
}

module.exports = Gatherer;
