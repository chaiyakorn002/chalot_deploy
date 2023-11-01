var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const products = require('./routes/products');
const loginRouter = require('./routes/login');
const checkinRouter = require('./routes/checkin');
const uploadRouter = require('./routes/uploads');
const cors = require('cors');
require('dotenv').config();
const uri = process.env.MONGO_URI;

mongoose.Promise = global.Promise;

mongoose.connect(uri)
        .then(() => console.log('connection successfully!'))
        .catch((err) => console.error(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const multer = require('multer');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', products);
app.use('/login', loginRouter);
app.use('/checkin', checkinRouter);
app.use('/uploads', uploadRouter);

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