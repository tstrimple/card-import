var request = require('request'),
    Request = require('./models/request');

module.exports = function(url, callback) {
  Request.findOne({ url: url }, function(err, doc) {
    if(err || !doc || doc.expired) {
      request(url, function(err, res, body) {
        if(!err) {
          var r = new Request({ url: url, response: JSON.stringify(res), body: body, updated: new Date() });
          r.save();
        }

        return callback(err, res, body);
      })
    } else {
      return callback(null, JSON.parse(doc.response), doc.body);
    }
  });
}