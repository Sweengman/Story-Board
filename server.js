var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//      ACTIVATE TOMORROW
// const session = require('express-session')
// const passport = require('passport');
//      ACTIVATE TOMORROW
const methodOverride = require('method-override')

require('dotenv').config();
// connect to the database with AFTER the config vars/const are processed
//      ACTIVATE TOMORROW
require('./config/database');

// require('./config/passport')
//      ACTIVATE TOMORROW


var indexRouter = require('./routes/index');
const scenesRouter = require('./routes/scenes')
const charactersRouter = require('./routes/characters')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

//      ACTIVATE TOMORROW
// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(function (req, res, next) {
//   res.locals.user = req.user;
//   next();
// });
//      ACTIVATE TOMORROW


app.use('/', indexRouter);
//      ACTIVATE TOMORROW
// app.use('/users', usersRouter);
//      ACTIVATE TOMORROW
app.use('/scenes', scenesRouter)
app.use('/', charactersRouter)


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
