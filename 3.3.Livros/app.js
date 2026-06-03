var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swagger = require('swagger-ui-express'); // Documentação
var swagger_saida = require('./config/swagger_output.json'); // Documentação


var rotasIndex = require('./routes/rotasIndex');
var rotasLivros = require('./routes/rotasLivros');
var rotasCategorias = require('./routes/rotasCategorias');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API (com prefixo /api)
app.use('/api-docs', swagger.serve, swagger.setup(swagger_saida)); // rota para a documentação Swagger
app.use('/', rotasIndex);
app.use('/api/livros', rotasLivros);
app.use('/api/categorias', rotasCategorias);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ 
    error: err.message,
    status: err.status || 500
  });
});

module.exports = app;