var express = require('express'),
    admin = require('./controllers/admin'),
    browse = require('./controllers/browse'),
    home = require('./controllers/home'),
    search = require('./controllers/search'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');

var mongoConnection = process.env.MONGODB_CONNECTIONSTRING || 'mongodb://localhost/mtgio';

mongoose.connect(mongoConnection);

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

//  home
app.get('/', home.index);

//  browse
app.get('/browse', browse.index);

//  admin
app.get('/admin', admin.index);
app.get('/admin/import', admin.import);

//  search
app.get('/search', search.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
