var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var session = require('express-session');
// var passport = require('./config/passport');
var passport = require('./config/passport');


// var indexRouter = require('./routes/index');
var rotasIndex = require('./routes/rotasIndex');
var livrosRouter = require('./routes/rotasLivros');
var usuariosRouter = require('./routes/rotasUsuarios');

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do middleware de sessão, utilizando express-session
app.use(session({
  // Chave usada para assinar o cookie de sessão e evitar adulteração.
  secret: 'CHAVE_SECRETA_DE_DESENVOLVIMENTO',
  // Evita salvar a sessão novamente se nada foi alterado durante a requisição.
  resave: false,
  // Não cria sessão para visitantes que ainda não autenticaram/interagiram com sessão.
  saveUninitialized: false,
  cookie: {
    // Impede acesso ao cookie via JavaScript no navegador (mitiga XSS).
    httpOnly: true,
    // Em produção com HTTPS deve ser true; em ambiente local HTTP fica false.
    secure: false,
    // Duração da sessão no navegador: 24 horas em milissegundos.
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

// Configuração do Passport para autenticação, deve ser após configuração de sessão
app.use(passport.initialize());

// Middleware para persistir login do usuário entre requisições, utilizando sessões
app.use(passport.session());

// Middleware para disponibilizar informações do usuário autenticado em todas as views
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use('/', rotasIndex);
app.use('/livros', livrosRouter);
app.use('/usuarios', usuariosRouter);

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
