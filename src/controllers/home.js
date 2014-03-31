var urls = require('../data/urls');

exports.index = function(req, res) {
  res.render('home/index', { title: 'Home' });
}
