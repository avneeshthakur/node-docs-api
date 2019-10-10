var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dbUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/node-docs";

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var docsRouter = require('./routes/docs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration and connecting to Databse MongoDb
mongoose.connect(dbUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}, (err) => {
   if (err) {
      console.log('Connection Error: ', err);
   } else {
      console.log('Successfully Connected');
   }
});

mongoose.Promise = global.Promise;

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/docs', docsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
