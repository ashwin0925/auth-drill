var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require("cookie-parser")
var session = require("express-session")
var mongoose = require("mongoose");

var indexRouter = require('./routes/api');
var middleware = require('./modules/middleware');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

// connect to db
mongoose.connect('mongodb://localhost/authcookie', {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
  (err) => {
    console.log('connected', err ? false : true);
  });

app.use(middleware.loggedUser);
app.use("api/v1", indexRouter)


module.exports = app;
