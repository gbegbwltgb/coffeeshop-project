const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');
const contactsRouter = require('./routes/contacts');
const infoRouter = require('./routes/info');

//Устанавливаем соединение с mongoose
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || 'mongodb+srv://songerman:sbiglofrozle209@cluster0.x6op5.mongodb.net/restaurant-site?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

const app = express();

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter)
app.use('/menu', menuRouter)
app.use('/order', orderRouter)
app.use('/contacts', contactsRouter)
app.use('/info', infoRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  let status;
  let message;

  if (err.status === 404) {
    status = 404;
    message = "Not Found";
  } else {
    message = "Ups";
    status = "Something Went Wrong";
  }

  res.render("error", { status, message });
});

module.exports = app;
