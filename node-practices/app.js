var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// Import JWT vs Passport
const passport = require('passport');

// var BasicStrategy = require('passport-http').BasicStrategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSettings = require('./constants/jwtSettings');
// ----------------------------------------------- //

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var demoRouter = require('./routes/demo');
var authRouter = require('./routes/auth');
var categoriesRouter = require('./routes/categories');
var suppliersRouter = require('./routes/suppliers');
var customersRouter = require('./routes/customers');
var employeesRouter = require('./routes/employees');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');

/* Router Upload Image */
var uploadImgCategoriesRouter = require('./routes/uploadImage/ImgCategories');
var uploadImgCategoriesRouter = require('./routes/uploadImage/ImgProducts');
const { findDocument } = require('./helpers/MongoDbHelper');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: '*',
  })
);

// Passport: jwt
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSettings.SECRET;
opts.audience = jwtSettings.AUDIENCE;
opts.issuer = jwtSettings.ISSUER;

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    const id = payload.sub;
    // console.log(payload);
    const found = await findDocument(id, 'login');
    // console.log(found);
    if (found && found.active) {
      //ki???m tra active trong DB true hay false
      let error = null;
      let user = true;
      return done(error, user);
    } else {
      let error = null;
      let user = false;
      return done(error, user);
    }
  })
);

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/demo', demoRouter);
app.use('/auth', authRouter);
app.use('/categories', categoriesRouter);
app.use('/suppliers', suppliersRouter);
app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

/* Router Upload Image */
app.use('/uploadsCategories', uploadImgCategoriesRouter);
app.use('/uploads-products', uploadImgCategoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
