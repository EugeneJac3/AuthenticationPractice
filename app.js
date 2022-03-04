const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// get config consts
dotenv.config();
console.log("Salt rounds are:", process.env.SALT_ROUNDS);
const secretKey = process.env.SECRET_KEY;
console.log("secret key is ", secretKey)



// const token = jwt.sign({
//   data: 'Free the ducks'
// }, 
// secretKey , // hide from everyone but our app
// { expiresIn: '1h' });

// //verify a toek
// jwt.verify(
//   token,
//   secretKey,
//   function(err, decoded) {
//     console.log("Decoded", decoded);
//   }
// )
// console.log(token);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
// console.log("Added Nodemon")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
