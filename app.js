var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
require('./models/like_models');
require('./models/photo_models');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var photo = require('./routes/photo');
var comment = require('./routes/comment');
var canvas = require('./routes/canvas');
var gallery = require('./routes/gallery');

//var db = mongoose.connect("mongodb://hansneil:111_zzz@ds047335.mongolab.com:47335/hansneil");
var db = mongoose.connect("mongodb://localhost/photo");
var app = express();

// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.post('/login', login.authen);
app.get('/photo/:id', photo.getLikes);
app.post('/photo/:id', photo.addLikes);
/*app.get('/comment/:id', comment.getComments);*/
app.get(/^\/comment\/([a-zA-z]+)(\d+)$/, comment.getComments);
app.get('/newpage', comment.newComment);
app.get('/canvas/cv', canvas.getCanvas);
app.use('/', routes);
app.use('/users', users);
app.get('/gallery', gallery.getPhotos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  /*console.log('4040404040404004040');
  next(err);*/
  res.status(404).render('error');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
