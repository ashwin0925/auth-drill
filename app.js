var express = require('express');
var path = require('path');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
var express = require('express');
var path = require('path');
var logger = require('morgan')
var mongoose = require('mongoose')


// Configure dotenv
require('dotenv').config();
require('./models/student');

// connect to db
mongoose.connect('mongodb://localhost/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
  (err) => {
    console.log('connected', err ? false : true);
  });

var v1Router = require('./routes/v1');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', v1Router);

module.exports = app;
