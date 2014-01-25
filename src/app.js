var express = require('express'),
    mtg = require('./controllers/mtg'),
    admin = require('./controllers/admin'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mtgio');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

//  admin
app.get('/admin/import', admin.import);

app.get('/', mtg.listSets);
app.get('/:set', mtg.viewSet);
app.get('/:set/:card', mtg.viewCard);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
