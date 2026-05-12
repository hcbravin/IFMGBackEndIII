var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');


// var indexRouter = require('./routes/index');
var rotasIndex = require('./routes/rotasIndex');
var livrosRouter = require('./routes/rotasLivros');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// registra partials do handlebars
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Disponibiliza os arquivos estáticos do bootstrap e do bootstrap-icons
// Utilizei essas duas linhas para não ter que ficar movendo as pastas do node_modules para o public
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/icons', express.static(path.join(__dirname, 'node_modules/bootstrap-icons')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rotasIndex);
app.use('/livros', livrosRouter);

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
