
exports.index = function(req, res) {
  res.render('admin/index', { title: 'Admin' });
}

exports.import = function(req, res) {
  res.render('admin/import', { title: 'Admin - Index' });
}
