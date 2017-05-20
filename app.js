var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require("ejs");
var ejsl = require("ejs-locals");

var router = require('./routes/index');

var app = express();
var http = require('http').Server(app);
global.io = require('socket.io')(http);
var socket = require("./socket");
// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
 // res.render('error');
});

http.listen(process.env.PORT || 3000, function(){
    console.log("Server running...");
});

module.exports = app;
