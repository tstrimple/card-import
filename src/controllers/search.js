var Set = require('../models/set'),
    Card = require('../models/card'),
    Oracle = require('../models/oracle');

exports.index = function(req, res) {
  var hits = [];
  Oracle.search({query: { match: { autocomplete: req.query.q }}}, function(err, output) {
    output.hits.hits.forEach(function(hit) {
      hits.push({ 
        id: hit._id, 
        name: hit._source.name });
    });

    res.send(hits);
  });
};