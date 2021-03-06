var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var adminRouter = require('./routes/admin');
var fileUpload = require('express-fileupload');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var app = express();

var mongoose = require('mongoose');

//category

var session = require('express-session');
const nodemailer = require("nodemailer");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
  
app.set('view engine', 'handlebars');
	
app.use(fileUpload());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge:
  60000 }}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mydb1:mydb1@localhost:27017/mydb1')
//mongoose.connect('mongodb://localhost:27017/mydb1')
.then(()=>console.log("Connection Open"))
.catch(()=>console.log("Error"))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/subcategory', subcategoryRouter);

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
