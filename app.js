var express = require('express'),
    set = require('./routes/set'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mtgdata');

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

app.get('/', set.all);
app.get('/:set', set.view);
app.get('/:set/:card', set.viewCard);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
